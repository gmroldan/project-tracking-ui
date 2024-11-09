import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Team, TeamMember } from 'src/app/model/team';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

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
  isUpdate: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.findAllUsers()
      .subscribe(userPage => {
        this.users = userPage.content;

        if (this.route.snapshot.paramMap.has('id')) {
          this.isUpdate = true;
          this.initTeam();
        }
      });
  }

  private initTeam() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService.getTeam(id)
      .subscribe(team => {
        this.team = team;

        const memberIds = new Set(team.members.map(member => member.id) || []);
        this.selectedUsers = this.users.filter(user => user.id && memberIds.has(user.id));
        this.users = this.users.filter(user => user.id && !memberIds.has(user.id));
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
    this.team.members = [];
    for (let user of this.selectedUsers) {
      const teamMember: TeamMember = { id: user.id || 0, role: 'DEFAULT_ROLE' };
      this.team.members.push(teamMember);
    }

    if (this.isUpdate) {
      this.teamService.updateTeam(this.team)
        .subscribe(() => this.goBack());
    } else {
      this.teamService.createTeam(this.team)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
