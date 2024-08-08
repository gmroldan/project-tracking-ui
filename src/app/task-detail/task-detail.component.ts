import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../services/task.service';
import { Location } from '@angular/common';
import { User } from '../user';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  task: Task = {title: '', description: '', storyPoints: 0, priority: 'Low', status: 'TODO', userIdAssigned: null};
  priorities: string[] = ['Low', 'Medium', 'High'];
  statuses: string[] = ['TODO', 'IN_PROGRESS', 'DONE'];
  users: User[] = [];
  selectedUserName: string = '';
  isUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private taskService: TaskService,
    private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getTeamMembers(1)
      .subscribe(users => this.users = users);

    if (this.route.snapshot.paramMap.has('id')) {
      this.isUpdate = true;
      this.initTask();
    }
  }

  private initTask() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => {
        this.task = task;
        this.initUserAssigned(this.task);
      });
  }

  private initUserAssigned(task: Task) {
    if (task.userIdAssigned) {
      const userAssigned = this.users.find(user => user.id === task.userIdAssigned)?.fullName;

      if (userAssigned) {
        this.selectedUserName = userAssigned;
      }
    }
  }

  save(): void {
    if (this.isUpdate) {
      this.taskService.updateTask(this.task)
        .subscribe(() => this.goBack());
    } else {
      this.taskService.createTask(this.task)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  onUserSelected(user: any): void {
    this.task.userIdAssigned = user.id;
    this.selectedUserName = user.fullName;
  }
}
