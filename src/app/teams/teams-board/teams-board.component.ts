import { Component } from '@angular/core';
import { Team } from 'src/app/model/team';

@Component({
  selector: 'app-teams-board',
  templateUrl: './teams-board.component.html',
  styleUrls: ['./teams-board.component.css']
})
export class TeamsBoardComponent {
  teams: Team[] = [
    {id: 1, projectId: 1, projectName: 'My First Project'},
    {id: 2, projectId: 2, projectName: 'Second Project'}
  ];

  displayedColumns: string[] = ['id', 'projectName']
  public dataSource = this.teams;

}
