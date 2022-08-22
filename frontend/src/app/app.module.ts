import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { AppStatusComponent } from './app-status/app-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TagListComponent } from './tag-list/tag-list.component';
import { NewAppComponent } from './new-app/new-app.component';
import { ManageAppComponent } from './manage-app/manage-app.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TagFormComponent,
    AppStatusComponent,
    TagListComponent,
    NewAppComponent,
    ManageAppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
