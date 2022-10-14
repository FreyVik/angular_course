import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project!: Project;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.urlProject;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = JSON.parse(JSON.stringify(params)).id;

      console.log(id);
      

      this.getProject(id)
    })
  }

  getProject(id: any) {
    this._projectService.getProject(id).subscribe({
      next: (response) => {        
        this.project = response.project
      },
      error: (err) => {
        console.error(<any>err);
      }
    })
  }
}
