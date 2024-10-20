import { Component } from '@angular/core';
import { Team } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-board',
  templateUrl: './teams-board.component.html',
  styleUrls: ['./teams-board.component.css']
})
export class TeamsBoardComponent {

  displayedColumns: string[] = ['id', 'name']
  dataSource: Team[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(response => this.dataSource = response);
  }

}
