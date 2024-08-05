import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  task: Task = {title: '', description: '', storyPoints: 0, priority: 'Low', status: 'TODO', userIdAssigned: null};
  priorities: string[] = ['Low', 'Medium', 'High'];
  statuses: string[] = ['TODO', 'IN_PROGRESS', 'DONE'];
  isUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.isUpdate = true;
      this.getTask();
    }
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
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
}
