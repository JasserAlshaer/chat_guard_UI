import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsService } from '../us.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:String|any="";
constructor(private spinner: NgxSpinnerService,public totstr:ToastrService,public service :UsService) {}


  ngOnInit(): void {

  }

  Logout(){
   
        this.token=localStorage.getItem('token');
        let data:any|undefined = jwtDecode(this.token); 

        if(data.Email){
           this.service.LogoutFromSystem(data.Email); 
        }
  }



}
