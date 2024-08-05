import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from './board';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private apiUrl = 'http://localhost:8080/sprints';

  constructor(private http: HttpClient) { }

  getSprintBoard(id: number): Observable<Board> {
    const url = `${this.apiUrl}/${id}/board`;
    return this.http.get<Board>(url);
  }
}
