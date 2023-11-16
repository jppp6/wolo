import { Player } from './wolo.models';

export class Utils {
    static newPlayer(name: string, number: number): Player {
        return {
            playerId: crypto.randomUUID(),
            number: number,
            name: name,
            f1: '',
            f2: '',
            f3: '',
            q1: 0,
            q2: 0,
            q3: 0,
            q4: 0,
            q5: 0,
            total: 0,
        } as Player;
    }

    static emptyTeam(): Player[] {
        const team: Player[] = [];
        for (let i = 1; i <= 20; i++) {
            team.push(this.newPlayer('', i));
        }
        return team;
    }
}
