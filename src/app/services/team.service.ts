import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
 
  private apiUrl = "http://localhost:8080/teams"

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team);
  }

  getTeam(id: number): Observable<Team> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Team>(url);
  }

  updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(this.apiUrl, team);
  }
}
