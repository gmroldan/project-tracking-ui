import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-tracking-ui';

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  closeDrawer(): void {
    this.drawer.close();
  }
}
