import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {

  project: Project = { title: "" };
  isUpdate: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.isUpdate = true;
      this.initProject();
    }
  }

  private initProject() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id).subscribe(project => {
      this.project = project;
    });
  }

  save(): void {
    if (this.isUpdate) {
      this.projectService.updateProject(this.project)
        .subscribe(() => this.goBack());
    } else {
      this.projectService.createProject(this.project)
        .subscribe(() => this.goBack());
    }
    
  }

  goBack(): void {
    this.location.back();
  }

}
