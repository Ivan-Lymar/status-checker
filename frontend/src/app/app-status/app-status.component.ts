import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {App} from './../model/App'
import { HttpClient, HttpHeaders  } from '@angular/common/http';
@Component({
  selector: 'app-app-status',
  templateUrl: './app-status.component.html',
  styleUrls: ['./app-status.component.css']
})
export class AppStatusComponent implements OnInit {

  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  tag: string = 'ee'
  apps: App[] = []

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
          this.tag = params['tag'];
          this.http.get<any>(`http://localhost:8080/statuses/${this.tag}`)
                       .subscribe(
                               (data: App[]) => {
                                console.log(data)
                                this.apps = data
                               }
         );

      });
  }



}
