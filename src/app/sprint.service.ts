import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private apiUrl = 'http://localhost:8080/sprints';

  constructor(private http: HttpClient) { }

  getSprintBoard(id: number): Observable<Task[]> {
    const url = `${this.apiUrl}/${id}/tasks`;
    return this.http.get<Task[]>(url);
  }
}
