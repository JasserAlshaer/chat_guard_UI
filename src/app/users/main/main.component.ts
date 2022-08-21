import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsService } from '../us.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  message:any="";
  constructor(private spinner: NgxSpinnerService,public totstr:ToastrService,public service :UsService) {}

  ngOnInit(): void {
  }

  SendText(){
    if(this.message==""){
      this.totstr.warning('Please Enter Text')
     }else{
        
       this.service.SearchForNewUser(this.message);
     }
  }

}
