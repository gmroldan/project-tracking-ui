import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../model/board';
import { Project } from '../model/project';

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

  getProjects(): Observable<Project[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Project[]>(url);
  }

  getProject(id: number): Observable<Project> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Project>(url);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.apiUrl, project);
  }
}
