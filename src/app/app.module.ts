import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AppRoutingModule } from './app-routing.module';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LoginComponent } from './login/login.component';
import { UserMenuComponent } from './toolbar/user-menu/user-menu.component';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksBoardComponent,
    TaskCardComponent,
    TaskDetailComponent,
    LoginComponent,
    ToolbarComponent,
    UserMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
