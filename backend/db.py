from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import pandas as pd
import uuid
import json
import os


class MyDB:
    def __init__(self) -> None:
        load_dotenv()
        self.engine = create_engine(
            "postgresql+psycopg2://{}:{}@{}:{}/{}".format(
                os.getenv("DB_USER"),
                os.getenv("DB_PASS"),
                os.getenv("DB_HOST"),
                os.getenv("DB_PORT"),
                os.getenv("DB_NAME"),
            )
        )
        
    def get_teams(self, user_id: str) -> list:
        query = text("SELECT t.team_model FROM teams t WHERE t.user_id=:user_id;")
        params = {
            'user_id': user_id,
        }

        with self.engine.connect() as conn:
            res = pd.read_sql_query(query, con=conn, params=params)

        return res["team_model"].tolist()
    
    
    def post_team(self, user_id: str, team_model: dict) -> None:
        query = text("""
            INSERT INTO teams (user_id, team_name, team_model)
            VALUES (:user_id, :team_name, :team_model)
            ON CONFLICT (user_id, team_name)
            DO UPDATE SET team_model = :team_model;
        """)

        params = {
            'user_id': user_id,
            'team_name': team_model["name"],
            'team_model': json.dumps(team_model)
        }
        with self.engine.connect() as conn:
            conn.execute(query, parameters=params)
            conn.commit()
            

    def get_game(self, game_id: str) -> str:
        if not self.valid_uuid(game_id):
            return []

        query = text("SELECT g.game_info FROM games g WHERE g.game_id=:game_id;")
        params = {
            "game_id": game_id
        }

        with self.engine.connect() as conn:
            res = pd.read_sql_query(query, con=conn, params=params)

        return res.to_dict("records")


    def get_games(self, user_id: str) -> list:
        query = text("SELECT g.game_info FROM games g WHERE g.user_id=:user_id;")
        params = {
            'user_id': user_id,
        }

        with self.engine.connect() as conn:
            res = pd.read_sql_query(query, con=conn, params=params)

        return res["game_info"].tolist()
    
    def post_game(self, user_id: str, game_id: str, game_info):
        if not self.valid_uuid(game_id):
            return
        
        query = text("""
            INSERT INTO games (game_id, game_info, user_id)
            VALUES (:game_id, :game_info, :user_id)
            ON CONFLICT (game_id, user_id)
            DO UPDATE SET game_info = :game_info;
        """)

        params = {
            'game_id': game_id,
            'game_info': json.dumps(game_info),
            'user_id': user_id
        }
        with self.engine.connect() as conn:
            conn.execute(query, parameters=params)
            conn.commit()

    def valid_uuid(self, uuid_to_test: str) -> bool:
        try:
            uuid.UUID(uuid_to_test)
            return True
        except ValueError:
            return False
