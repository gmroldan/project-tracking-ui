import { Component } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.css']
})
export class TasksBoardComponent {
  tasks: Task[] = [
    {
      id: 1,
      title: 'My First task',
      description: 'This is a description',
      storyPoints: 3,
      priority: 'Low',
      status: 'TODO'
    },
    {
      id: 2,
      title: 'My Second task',
      description: 'This is a description',
      storyPoints: 5,
      priority: 'Low',
      status: 'TODO'
    }
  ];

}
