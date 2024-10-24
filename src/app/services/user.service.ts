import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPage } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = "http://localhost:8080/users";

  constructor(private http: HttpClient) {}

  public findAllUsers(): Observable<UserPage> {
    return this.http.get<UserPage>(`${this.apiUrl}?page=0&size=100`);
  }
}
