import { Injectable } from '@angular/core';
import { Task } from '../task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) { }

  getTasks(page: number, size: number): Observable<Task[]> {
    const url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<Task[]>(url);
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.apiUrl, task);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
