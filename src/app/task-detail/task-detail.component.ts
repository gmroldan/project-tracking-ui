import { Component, Input } from '@angular/core';
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
  @Input() task?: Task;
  priorities: string[] = ['Low', 'Medium', 'High'];
  statuses: string[] = ['TODO', 'IN_PROGRESS', 'DONE'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  save(): void {
    if (this.task) {
      this.taskService.update(this.task)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
