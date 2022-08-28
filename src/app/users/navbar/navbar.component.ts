import { Component, OnInit, ViewChild } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsService } from '../us.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('subscribeModel', { static: false }) childModal?: ModalDirective;
constructor(private spinner: NgxSpinnerService,public totstr:ToastrService,public service :UsService) {}

token:String|any="";
searchFileds:string="";
  ngOnInit(): void {

  }

  Logout(){
   
        this.token=localStorage.getItem('token');
        let data:any|undefined = jwtDecode(this.token);
        debugger
        console.log(this.token);
        this.service.LogoutFromSystem(data.email); 
       
  }

  Search(){
    if(this.searchFileds==""){
         this.totstr.warning('Please Enter Text')
         
    }else{
       this.service.SearchForNewUser(this.searchFileds);
     
       this.childModal?.show();
      
    }

  }

  Disapper(){
    this.childModal?.hide();
  }
  CloseDialog(){
    this.childModal?.hide();
  }
  OpenConservaitions(userId:number){

  }

  CreateConservations(){
    const conserv={
      "Title":"",
      "FirstUserId":"",
      "SecondUserId":"",
      "FirstUserView":"Active",
      "SecondUserView":"Active"

    };

  }



}
