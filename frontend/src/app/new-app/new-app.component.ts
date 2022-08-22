import { Component } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import {App} from './../model/App'

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.css']
})
export class NewAppComponent  {

  constructor(private http: HttpClient) { }

         apiResponse: string = ''
         isError = false
         isSuccess = false

         public appForm = new FormGroup({
            name: new FormControl(''),
            description: new FormControl(''),
          });

  public createApp(): void {
             this.apiResponse = '';
             this.isSuccess=false;
             this.isError=false;

             let form = this.appForm.controls

             let app = new App();
             app.name = form.name.value!
             app.description = form.description.value!

             this.http.post<any>('http://localhost:8080/app'
             ,app
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
