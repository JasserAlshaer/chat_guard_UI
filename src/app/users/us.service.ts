import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { contentDTO } from './Entites/contentDTO';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UsService {

  headersWithToken:String|any="";
  suggestedUser:any[]=[];
  analyzeResult:number=0;
  myContentData:any[]=[];

  constructor(public http:HttpClient,public ngxSpinner:NgxSpinnerService,public toastr:ToastrService
    ,public router:Router) { 


    }
  //calling with api 


  LoginInSystem(object:any){
   
    this.ngxSpinner.show();
    this.http.post('http://localhost:3025/api/Main/AccessAccount',object,{ responseType: 'text' })
    .subscribe((res: any) => {
      if (res) {
        localStorage.setItem('token',res)
        this.toastr.success('Login Success');
        this.router.navigate(['main']);
        this.toastr.success('Done');
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed Login')
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
        this.toastr.warning('Logout');
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
    this.headersWithToken=localStorage.getItem('token')
    var header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':this.headersWithToken
        })
    }
    this.ngxSpinner.show();
    this.http.post('http://localhost:3025/api/Main/SendMassage',message,header).subscribe((res: any) => {
      if (res) {
        //this.toastr.success('Done');
        this.GetMyAccountContenctAndData();
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error('Failed Logout')
      this.ngxSpinner.hide();
    })
    this.GetMyAccountContenctAndData();
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
  GetMyAccountContenctAndData(){
    this.headersWithToken=localStorage.getItem('token')
    var header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':this.headersWithToken
        })
    }
    let data:any|undefined = jwtDecode(this.headersWithToken); 
    this.ngxSpinner.show();
    this.http.get('http://localhost:3025/api/Main/GetMyOwnContent?userID='+data.UserId,header).subscribe((res: any) => {
      if (res) {
        this.myContentData=res;
        this.ngxSpinner.hide();     
      } else {
        this.toastr.error('Failed Data')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error(error.message)
      this.ngxSpinner.hide();
    })
  }
  UpdateMessageViewAndLabel(messageupdater:any){
    this.headersWithToken=localStorage.getItem('token')
    var header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':this.headersWithToken
        })
    }
    let data:any|undefined = jwtDecode(this.headersWithToken); 
    this.ngxSpinner.show();
    this.http.post('http://localhost:3025/api/Main/UpdateMassageViewAndLabel',messageupdater,header).subscribe((res: any) => {
      if (res) {
          
      } else {
        this.toastr.error('Failed Data')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error(error.message)
      this.ngxSpinner.hide();
    })
  }
  ConseravitionStarting(con:any){
    this.headersWithToken=localStorage.getItem('token')
    var header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':this.headersWithToken
        })}
    this.ngxSpinner.show();
    this.http.post('http://localhost:3025/api/Main/StartConservations',con,header).subscribe((res: any) => {
      if (res) {
        this.ngxSpinner.hide();
      } else {
        this.toastr.error('Failed Data')
        this.ngxSpinner.hide();
      }
    }, (error) => {
      this.toastr.error(error.message)
      this.ngxSpinner.hide();
    })
  }

}
