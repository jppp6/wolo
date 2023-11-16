export interface StateModel {
    light: TeamModel;
    dark: TeamModel;
    info: InfoModel;
    events: EventsModel[];
}

export interface TeamModel {
    teamId: string;
    name: string;
    coach: string;
    assistant1: string;
    assistant2: string;
    players: Player[];
    timeouts: string[];
    capChanges: string[];
    cards: string[];
}

export interface StoredTeamModel {
    teamId: string;
    name: string;
    coach: string;
    assistant1: string;
    assistant2: string;
    players: { playerId: string; number: number; name: string }[];
}

export interface InfoModel {
    gameId: string;
    lightScore: number;
    darkScore: number;
    quarter: number;
    location: string;
    startTime: string;
    endTime: string;
    date: Date;
    league: string;
    category: string;
    referee1: string;
    referee2: string;
    delegate1: string;
    delegate2: string;
}

export interface EventsModel {
    eventId: string;
    number: number;
    color: string;
    incident: string;
    time: string;
    lightScore: number;
    darkScore: number;
}

export interface Player {
    playerId: string;
    number: number;
    name: string;
    f1: string;
    f2: string;
    f3: string;
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    q5: number;
    total: number;
}
