import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
  { path: 'board', component: TasksBoardComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
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
