import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.css']
})
export class TasksBoardComponent {
  tasks: Task[] = [];
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.getSprintBoard(1).subscribe(
      board => {
        this.tasks = board.tasks;

        this.todo = this.filterTasksByStatus('TODO')
        this.inProgress = this.filterTasksByStatus('IN_PROGRESS');
        this.done = this.filterTasksByStatus('DONE');
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  private filterTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      this.handleInternalMove(event);
    } else {
      this.handleContainerChange(event);
    }
  }

  private handleInternalMove(event: CdkDragDrop<Task[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  private handleContainerChange(event: CdkDragDrop<Task[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    let newStatus = this.resolveStatus(event);
    const movedTask = event.container.data[event.currentIndex];
    movedTask.status = newStatus;

    this.taskService.updateTask(movedTask).subscribe(() => console.log('Task updated'));
  }

  private resolveStatus(event: CdkDragDrop<Task[]>): string {
    let status = '';

    if (event.container.id === 'todo') {
      status = 'TODO';
    } else if (event.container.id === 'in-progress') {
      status = 'IN_PROGRESS';
    } else {
      status = 'DONE';
    }

    return status;
  }

}
