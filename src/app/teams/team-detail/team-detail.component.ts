import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Team, TeamMember } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent {
  team: Team = { name: '' , members: []};
  users: User[] = [];
  selectedUsers: User[] = [];
  selectedUser: string = ''; // Input value for the autocomplete

  constructor(
    private location: Location,
    private teamService: TeamService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.findAllUsers()
      .subscribe(userPage => {
        this.users = userPage.content;
      });
  }

  onUserSelected(selectedUser: User) {
    if (selectedUser && selectedUser.id && !this.selectedUsers.some(member => member.id === selectedUser.id)) {
      this.selectedUsers.push(selectedUser);
      this.users = this.users.filter(user => user.id !== selectedUser.id);
    }    
    
    this.selectedUser = '';
  }

  formatUserName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  save(): void {
    for (let user of this.selectedUsers) {
      const teamMember: TeamMember = { id: user.id || 0, role: '' };
      this.team.members.push(teamMember);
    }

    this.teamService.createTeam(this.team)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
