import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: boolean;
  public proccessed: boolean;
  public filesToUpload: Array<File>
  public saveProject: any;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ){
    this.title = "Crear proyecto";
    this.project = new Project('','','','', 2022,'','');
    this.status = false;
    this.proccessed = false;
    this.filesToUpload = [];
    this.saveProject = null;
  }

  ngOnInit(): void {
  }

  onSubmit(_form: any){
    this.proccessed = true;
    console.log(this.project);

    this._projectService.save(this.project).subscribe({
      next: (response) => {
        let jsonResponse = JSON.parse(JSON.stringify(response));
        console.info(jsonResponse);

        if (jsonResponse.project) {
          // Subir imagen
          this._uploadService.makeFileRequest(Global.urlProject + 'uploadImage/' + jsonResponse.project._id, [], this.filesToUpload, 'image')
            .then(
              (result:any) => {
                console.log('Project: ' + result.project);
                
                this.saveProject = result.project;

                console.log(this.saveProject);
                
                
                this.status = true;
                console.log(result);
                _form.reset();
              }
            )
        }
      },
      error: (err) => {
        console.log(<any>err);
      }
    })
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
