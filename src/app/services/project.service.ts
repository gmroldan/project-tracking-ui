import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Board } from '../model/board';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/projects';

  constructor(private http: HttpClient) { }

  getTeamMembers(id: number): Observable<User[]> {
    const url = `${this.apiUrl}/${id}/team`;
    return this.http.get<User[]>(url);
  }

  getSprintBoard(id: number): Observable<Board> {
    const url = `${this.apiUrl}/${id}/board`;
    return this.http.get<Board>(url);
  }
}
