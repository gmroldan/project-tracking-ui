import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.css']
})
export class TasksBoardComponent {
  tasks?: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

}
