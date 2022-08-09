import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
