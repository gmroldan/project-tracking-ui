import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private TASKS: Task[] = [
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

  constructor() { }

  getTasks(): Task[] {
    return this.TASKS;
  }
}
