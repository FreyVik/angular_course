import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "../models/project";
import { Global } from "./global";

@Injectable()
export class ProjectService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.urlProject;
    }

    testService(){
        return "Testing project service";
    }

    save(project: Project) {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url + 'save', params, {headers: headers});
    }

    getProjects(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'list', {headers: headers});
    }

    getProject(id: number): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');

        console.log(this.url + id);
        
        return this._http.get(this.url + 'get/' + id, {headers: headers});
    }
}