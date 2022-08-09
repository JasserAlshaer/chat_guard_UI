import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    ToastrModule,
    NgxSpinnerModule,
    ModalModule,
    FormsModule
  ]
})
export class SharedModule { }
