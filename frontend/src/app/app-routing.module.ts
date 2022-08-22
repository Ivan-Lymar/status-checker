import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagFormComponent } from './tag-form/tag-form.component';
import { AppStatusComponent } from './app-status/app-status.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { NewAppComponent } from './new-app/new-app.component';
import { ManageAppComponent } from './manage-app/manage-app.component';

const routes: Routes = [
 { path: 'tag', component: TagFormComponent },
 { path: 'status', component: AppStatusComponent },
 { path: 'app', component: NewAppComponent },
 { path: 'manage', component: ManageAppComponent },
 { path: '', component: TagListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
