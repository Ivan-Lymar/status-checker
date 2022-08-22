import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {Tag} from './../model/Tag'
import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  tags: Tag[] = [];
  tagsToShow: Tag[] = [];

  search: string = '';
  @ViewChild('tagSearch', { static: true }) tagSearch: ElementRef;

  ngOnInit() {
       this.getTags();
       fromEvent(this.tagSearch.nativeElement, 'keyup').pipe(
       map((event: any) => {
               return event.target.value;
             })
             , debounceTime(1000)
             ,distinctUntilChanged()
             ).subscribe((text: string) => {
                 this.sortTags(text);
             });

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

  getTags() {
    this.http.get<any>('http://localhost:8080/tags')
                     .subscribe(data => {
                        this.tags = data
                        this.tagsToShow = this.tags
                     })
  }

}
