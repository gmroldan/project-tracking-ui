import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {

  @Output() loggedOut: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private authService: AuthService,
              private router: Router) {}

  logout() {
    this.authService.logout(this.router);
    this.loggedOut.emit();
  }
}
