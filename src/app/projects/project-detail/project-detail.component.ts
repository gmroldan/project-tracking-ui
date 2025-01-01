import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {

  project: Project = { title: "" };

  constructor(
    private location: Location,
    private projectService: ProjectService
  ) {}

  save(): void {
    this.projectService.createProject(this.project)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
