import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;

  constructor(
    private _projectService: ProjectService
  ){
    this.title = "Crear proyecto";
    this.project = new Project('','','','', 2022,'','');

    /*
    public _id: string,
    public name: string,
    public description: string,
    public category: string,
    public year: number,
    public langs: string,
    public image: string
    */
    
  }

  ngOnInit(): void {
  }

  onSubmit(_form: any){
    console.log(this.project);
  }
}
