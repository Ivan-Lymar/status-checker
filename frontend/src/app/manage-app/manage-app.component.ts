import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {Tag} from './../model/Tag'
import {App} from './../model/App'
import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-manage-app',
  templateUrl: './manage-app.component.html',
  styleUrls: ['./manage-app.component.css']
})
export class ManageAppComponent implements OnInit {

   constructor(private http: HttpClient) {
   }

    tags: Tag[] = [];
    tagsToShow: Tag[] = [];
    apps: App[] = [];
    appsToShow: App[] = [];
    search: string = '';
    selectedApp: App = new App();

    apiResponse: string = ''
    isError = false
    isSuccess = false


    @ViewChild('appSearch', { static: true }) appSearch: ElementRef;
    @ViewChild('tagSearch', { static: true }) tagSearch: ElementRef;

    ngOnInit() {
         this.getApps();
         this.getTags();
         fromEvent(this.appSearch.nativeElement, 'keyup').pipe(
         map((event: any) => {
                 return event.target.value;
               })
               , debounceTime(1000)
               ,distinctUntilChanged()
               ).subscribe((text: string) => {
                   this.sortApps(text);
               });

         fromEvent(this.tagSearch.nativeElement, 'keyup').pipe(
                  map((event: any) => {
                          return event.target.value;
                        })
                        , debounceTime(1000)
                        ,distinctUntilChanged()
                        ).subscribe((text: string) => {
                            console.log(text);
                            this.sortTags(text);
                        });
    }

    sortApps(text: string) {
      let arr = [] as App[];

      for (let entry of this.apps) {
           if(entry.name.includes(text)) {
              arr.push(entry)
           }
      }
      this.appsToShow = arr;
    }

     sortTags(text: string) {
          let arr = [] as Tag[];

          for (let entry of this.tags) {
               if(entry.name.includes(text)) {
                  arr.push(entry)
               }
          }
          this.tagsToShow = arr;
     }

    getApps() {
      this.http.get<App[]>('http://localhost:8080/apps')
                       .subscribe(data => {
                          this.apps = data
                          this.appsToShow = this.apps
                       })
    }

    selectApp(app: App) {
      this.selectedApp = app;
      console.log(app);
    }

    isAppSelected(){
      return Object.keys(this.selectedApp).length === 0
    }

    deleteTag(tag: Tag) {
      if(confirm("Are you sure to delete " + tag.name)) {
        this.selectedApp.tags = this.selectedApp.tags.filter(obj => {return obj !== tag});
      }
    }

    addTag(tag: Tag) {
      this.selectedApp.tags.push(tag);
    }

     getTags() {
        this.http.get<any>('http://localhost:8080/tags')
                         .subscribe(data => {
                            this.tags = data
                            this.tagsToShow = this.tags
                         })
     }

     updateLead() {
        this.http.post<any>('http://localhost:8080/app'
                     ,this.selectedApp
                     ,{headers:new HttpHeaders().set('Content-Type','application/json')}
                     )
                     .subscribe(
                             data => {
                             console.log('asdsa')
                             this.apiResponse ='success'
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
