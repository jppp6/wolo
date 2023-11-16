import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Events } from '../actions/events.actions';
import { Game } from '../actions/game.actions';
import { Team } from '../actions/team.actions';
import { Utils } from '../utils/utils';
import {
    EventsModel,
    InfoModel,
    StateModel,
    TeamModel,
} from '../utils/wolo.models';

@State<StateModel>({
    name: 'wolo',
    defaults: {
        light: {
            teamId: crypto.randomUUID(),
            name: '',
            coach: '',
            assistant1: '',
            assistant2: '',
            players: Utils.emptyTeam(),
            timeouts: [],
            capChanges: [],
            cards: [],
        },
        dark: {
            teamId: crypto.randomUUID(),
            name: '',
            coach: '',
            assistant1: '',
            assistant2: '',
            players: Utils.emptyTeam(),
            timeouts: [],
            capChanges: [],
            cards: [],
        },
        info: {
            gameId: crypto.randomUUID(),
            lightScore: 0,
            darkScore: 0,
            quarter: 1,
            location: '',
            startTime: '',
            endTime: '',
            date: new Date(),
            league: '',
            category: '',
            referee1: '',
            referee2: '',
            delegate1: '',
            delegate2: '',
        },
        events: [],
    },
})
@Injectable()
export class WoloState {
    @Selector()
    static selectLight(state: StateModel): TeamModel {
        return state.light;
    }

    @Selector()
    static selectDark(state: StateModel): TeamModel {
        return state.dark;
    }

    @Selector()
    static selectInfo(state: StateModel): InfoModel {
        return state.info;
    }

    @Selector()
    static selectEvents(state: StateModel): EventsModel[] {
        return state.events;
    }

    @Action(Game.Create)
    gameCreate(ctx: StateContext<StateModel>): void {}
    @Action(Game.GetAll)
    gameGetAll(ctx: StateContext<StateModel>): void {}
    @Action(Game.GetOne)
    gameGetOne(ctx: StateContext<StateModel>, p: Game.GetOne): void {}
    @Action(Game.Update)
    gameUpdate(ctx: StateContext<StateModel>): void {}
    @Action(Game.Delete)
    gameDelete(ctx: StateContext<StateModel>): void {}

    @Action(Team.Create)
    teamCreate(ctx: StateContext<StateModel>): void {}
    @Action(Game.GetAll)
    teamGetAll(ctx: StateContext<StateModel>): void {}
    @Action(Game.GetOne)
    teamGetOne(ctx: StateContext<StateModel>, p: Team.GetOne): void {}
    @Action(Game.Update)
    teamUpdate(ctx: StateContext<StateModel>): void {}
    @Action(Game.Delete)
    teamDelete(ctx: StateContext<StateModel>): void {}

    @Action(Events.Goal)
    eventGoal(ctx: StateContext<StateModel>, p: Events.Goal): void {}
    @Action(Events.Quarter)
    eventQuarter(ctx: StateContext<StateModel>, p: Events.Quarter): void {}
    @Action(Events.Timeout)
    eventTimeout(ctx: StateContext<StateModel>, p: Events.Timeout): void {}
    @Action(Events.Card)
    eventCard(ctx: StateContext<StateModel>, p: Events.Card): void {}
    @Action(Events.CapSwap)
    eventCapSwap(ctx: StateContext<StateModel>, p: Events.CapSwap): void {}
    @Action(Events.Exclusion)
    eventExclusion(ctx: StateContext<StateModel>, p: Events.Exclusion): void {}
    @Action(Events.Brutality)
    eventBrutality(ctx: StateContext<StateModel>, p: Events.Brutality): void {}
}
