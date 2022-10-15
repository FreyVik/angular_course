import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project!: Project;
  public status: boolean;
  public proccessed: boolean;
  public filesToUpload: Array<File>
  public saveProject: any;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute,
  ){
    this.title = "Editar proyecto";
    this.status = false;
    this.proccessed = false;
    this.filesToUpload = [];
    this.saveProject = null;
    this.url = Global.urlProject;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = JSON.parse(JSON.stringify(params)).id;
      
      this.getProject(id);
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

  onSubmit(_form: any){
    this.proccessed = true;
    this._projectService.edit(this.project).subscribe({
      next: (response) => {        
        let jsonResponse = JSON.parse(JSON.stringify(response));
        
        console.log(this.filesToUpload);
        
        // Subir imagen
        if(this.filesToUpload.length > 0) {
          this._uploadService.makeFileRequest(Global.urlProject + 'uploadImage/' + jsonResponse.project._id, [], this.filesToUpload, 'image')
          .then(
            (result:any) => {
              console.log('Project: ' + result.project);
              
              this.saveProject = result.project;

              console.log(this.saveProject);
              
              
              this.status = true;
              console.log(result);
            }
          )
        } else {
          console.log('Project\n{}', response.project);
          
          this.saveProject = response.project;
          this.status = true;
        }
      },
      error: (err) => {
        console.error(<any>err);
      }
    })
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
