from quart import Quart, request, send_from_directory
from db import MyDB
import json


app = Quart(__name__)
db = MyDB()


@app.route("/teams", methods=["GET"])
async def get_teams():
    if request.method == "GET":
        user_id = request.args.get("user_id")
        teams = db.get_teams(user_id)
        return {"teamModels": teams}
    return {"teamModels": []}


@app.route("/teams", methods=["POST"])
async def post_team():
    if request.method == "POST":
        data = json.loads(await request.get_data())
        user_id = data["user_id"]
        team_model = data["team_model"]

        db.post_team(user_id, team_model)
        return {"success": True}
    return {"success": False}


@app.route("/games", methods=["GET"])
async def get_games():
    if request.method == "GET":
        user_id = request.args.get("user_id")
        game_models = db.get_games(user_id)
        return {"gameModels": game_models}
    return {"gameModels": []}

@app.route("/games", methods=["POST"])
async def post_game():
    if request.method == "POST":
        data = json.loads(await request.get_data())
        user_id = data["user_id"]
        game_id = data["game_id"]
        team_model = data["game_model"]

        db.post_game(user_id, game_id, team_model)
        return {"success": True}
    return {"success": False}

@app.route('/')
async def index():
    return await send_from_directory('wolo', 'index.html')

@app.route('/<path:filename>')
async def serve_static(filename):
    return await send_from_directory('wolo', filename)


if __name__ == '__main__':
    app.run()