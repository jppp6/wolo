import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environments/environment.dev';
import { StoredTeamModel } from '../utils/wolo.models';

@Injectable({
    providedIn: 'root',
})
export class MyHttpService {
    constructor(private http: HttpClient) {}

    getTeams(userId: string): Observable<{ teammodels: StoredTeamModel[] }> {
        const params = new HttpParams().set('user_id', userId);
        return this.http.get<{ teammodels: StoredTeamModel[] }>(
            `${url}/teams`,
            { params: params }
        );
    }
}
