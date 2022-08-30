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
userid:number=0;
token:String|any="";
searchFileds:string="";
  ngOnInit(): void {
    this.token=localStorage.getItem('token')
    let data:any|undefined = jwtDecode(this.token); 
    if(data){
      this.userid=data.UserId;
    }
  }

  Logout(){
   
        this.token=localStorage.getItem('token');
        let data:any|undefined = jwtDecode(this.token);
        this.service.LogoutFromSystem(data.email); 
       
  }

  Search(){
    if(this.searchFileds==""){
         this.totstr.warning('Please Enter A Text')
         
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

  getFirstName(str:string):string{
    const myArray = str.split(" ");
    console.log(myArray[0])
    return myArray[0];
  }

  CreateConservations(secondId:number){
    const conserv={
      "Title":"Default Conservaition",
      "FirstUserId":this.userid,
      "SecondUserId":secondId,
      "FirstUserView":"Active",
      "SecondUserView":"Active"
    };
    this.service.ConseravitionStarting(conserv)
    this.childModal?.hide();
  }
}
