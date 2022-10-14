import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {
  public projects: Project[];
  public url: string;

  constructor(
    private _projectService: ProjectService
  ){
    this.projects = [];
    this.url = Global.urlProject
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._projectService.getProjects().subscribe({
      next: (response) => {
        let projects = JSON.parse(JSON.stringify(response));
        console.log(projects);

        if(projects) {
          this.projects = projects.projects;
        }
      },

      error: (error) => {
        console.error(<any>error);
      }
    })
  }
}
