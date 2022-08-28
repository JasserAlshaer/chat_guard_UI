import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsService {

  headersWithToken:String|any="";
  token:String|any="";
  suggestedUser:any[]=[];
  analyzeResult:number=0;
  constructor(public http:HttpClient,public ngxSpinner:NgxSpinnerService,public toastr:ToastrService
    ,public router:Router) { }
  //calling with api 


  LoginInSystem(object:any){
   
    this.ngxSpinner.show();
    this.http.post('http://localhost:3025/api/Main/AccessAccount',object,{ responseType: 'text' })
    .subscribe((res: any) => {
      if (res) {
        localStorage.setItem('token',res)
        this.toastr.success('Login Success');
        this.router.navigate(['main']);
        //let data:any|undefined = jwtDecode(this.token); 
        this.toastr.success('Done');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error('Cannot Complete Login')
      this.ngxSpinner.hide();
    })
  }
  Register(object:any){
    this.ngxSpinner.show();
    this.http.post('http://localhost:3025/api/Main/CreateNewAccounts',object).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Done');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error('Failed Opertation')
      this.ngxSpinner.hide();
    })
  }
  LogoutFromSystem(email:string){
    this.ngxSpinner.show();
    debugger
    this.http.get('http://localhost:3025/api/Main/CloseSystem?email='+email+"").subscribe((res: any) => {
      if (res) {
        this.toastr.success('Done');
        this.ngxSpinner.hide();
        this.router.navigate(['']);
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error('Failed Logout')
      this.ngxSpinner.hide();
    })
  }
  SearchForNewUser(searchText:string){
    this.headersWithToken=localStorage.getItem('token')
    var header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':this.headersWithToken
        })
    }
    this.ngxSpinner.show();
    this.http.get('http://localhost:3025/api/Main/SearchForUser?searchText='+searchText,header).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Done');
        this.suggestedUser=res;
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error('Failed Logout')
      this.ngxSpinner.hide();
    })
  }
  SendMessage(message:any){
    this.ngxSpinner.show();
    this.http.post('http://localhost:3025/api/Main/SendMassage',message).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Done');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error('Failed Logout')
      this.ngxSpinner.hide();
    })
  }
  AnalyzeMessage(message:any){
    this.headersWithToken=localStorage.getItem('token')
    var header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':this.headersWithToken
        })
    }
    this.ngxSpinner.show();
    this.http.get('http://localhost:3025/api/Main/AnalyzeMassage?msg='+message,header).subscribe((res: any) => {
      if (res) {
        this.toastr.success('Done');
        this.analyzeResult=res;
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error('Failed Logout')
      this.ngxSpinner.hide();
    })
  }

  


}
