import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {Tag} from './../model/Tag'


@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent {

        constructor(private http: HttpClient) { }

        apiResponse: string = ''
        isError = false
        isSuccess = false

        public tagForm = new FormGroup({
           name: new FormControl('')
         });

         public createTag(): void {
             this.apiResponse = '';
             this.isSuccess=false;
             this.isError=false;

             let tag = new Tag();
             tag.name=this.tagForm.controls.name.value!;

             this.http.post<any>('http://localhost:8080/tag'
             ,tag
             ,{headers:new HttpHeaders().set('Content-Type','application/json')}
             )
             .subscribe(
                     data => {this.apiResponse ='success'
                     this.isSuccess=true
                     },
                     error => {
                     this.apiResponse = error.message
                     this.isError = true
                     }
             );
           }

           messagePresent ():any {
              return this.apiResponse === ""
           }

}
