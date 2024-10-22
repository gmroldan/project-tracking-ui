import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { TeamsBoardComponent } from './teams/teams-board/teams-board.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'board', component: TasksBoardComponent, canActivate: [authGuard] },
  { path: 'tasks/new', component: TaskDetailComponent, canActivate: [authGuard] },
  { path: 'detail/:id', component: TaskDetailComponent, canActivate: [authGuard] },
  { path: 'teams/board', component: TeamsBoardComponent, canActivate: [authGuard] },
  { path: 'teams/new', component: TeamDetailComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/board', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
