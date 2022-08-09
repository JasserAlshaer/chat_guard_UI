import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },{
    path:'main',
    component:MainComponent
  },{
    path:'search',
    component:SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
