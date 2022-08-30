import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
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
  headersWithToken:any="";
  currentIndex:number=-1;
  selectedMessageList:any[]=[];
  currentConservsation:any={};
  userid:number=0;
  isMass:boolean=false;
  constructor(private spinner: NgxSpinnerService,public totstr:ToastrService
    ,public router:Router,public service :UsService) {}

  ngOnInit(): void {
    this.headersWithToken=localStorage.getItem('token')
    let data:any|undefined = jwtDecode(this.headersWithToken); 
    if(data){
      this.GetData();
      this.userid=data.UserId;
    }else{
      this.router.navigate(['']);
    }
  
  }

 

  GetData(){
    this.service.GetMyAccountContenctAndData();
    this.LoadMessage(this.currentIndex, this.currentConservsation);
  }
  SendText(){
    if(this.message==""){
      this.totstr.warning('Please Enter Text')
     }else{
        
       this.service.SearchForNewUser(this.message);
     }
  }

  LoadMessage(index:number,object:any){
    
    if(this.currentIndex==index){
      this.selectedMessageList =[];
      this.currentIndex=-1;
      this.currentConservsation={};
      this.isMass=false;
    }else{
      this.selectedMessageList=this.service.myContentData[index].messages;
      this.currentIndex=index;
      this.currentConservsation=object.conservation;
      this.isMass=true;
    }
    
  }
  
  SendNewMassage(){
    const mass={
      
      text:this.message,
      fileUrl:"",
      imageUrl:"",
      videoUrl:"",
      sendAt:new Date(),
      viewedAt:"",
      conservitionId:this.currentConservsation.conservaitionId,
      senderId:this.userid,
      firstUserLabel:"Active",
      firstUserView:"Active",
      secondUserLabel:"Active",
      secondUserView:"Active"
    }
    this.service.SendMessage(mass);
    this.selectedMessageList=this.service.myContentData[this.currentIndex].messages;
  }
  /*checkMessageView():boolean{
    return false;
  }
  CheckMessageLabel(currentMassage:any):boolean{
    if(this.userid != currentMassage.senderId){
      //incomming massage
      if(currentMassage.senderId == currentMassage.firstUserId){
        if(currentMassage.secondUserView=="Deleted"){
          return false;
        }else{
          return true;
        }
      }else if(currentMassage.senderId == currentMassage.secondUserId){
        if(currentMassage.firstUserView=="Deleted"){
          return false;
        }else{
          return true;
        }
      }else {
        return false;
      }
    }else{
      //sended
      if(currentMassage.senderId == currentMassage.firstUserId){
        if(currentMassage.secondUserView=="Deleted"){
          return false;
        }else{
          return true;
        }
      }else if(currentMassage.senderId == currentMassage.secondUserId){
        if(currentMassage.firstUserView=="Deleted"){
          return false;
        }else{
          return true;
        }
      }else {
        return false;
      }
    }
  }*/
  MassageUpdater(viewFlag:number,labelFlag:number,messageId:number,isFU:boolean){
    const updater={
      "viewFlagId":viewFlag,
      "labelID":labelFlag,
      "userId":this.userid,
      "messageId":messageId,
      "isFirstUser":isFU
    }
    this.service.UpdateMessageViewAndLabel(updater)
  }

  PressToAnalyzeMessage(m:any){  
    this.service.AnalyzeMessage(m);
  }

}
