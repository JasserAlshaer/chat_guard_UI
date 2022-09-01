import { Component, OnInit ,HostListener,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from "@microsoft/signalR"
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsService } from '../us.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',
]
})
export class MainComponent implements OnInit {
  message:any="";
  headersWithToken:any="";
  currentIndex:number=-1;
  selectedMessageList:any[]=[];
  currentConservsation:any={};
  userid:number=0;
  isMass:boolean=false;
  public hubConnection: signalR.HubConnection | undefined;
  connected:any | undefined = 1;
   ArraysOfWord=
  [
      'Haave Offer For You',
      "Access now","Act now","Act Immediately","Action Required","Apply now","Apply online","Buy",
      "Buy now","Buy direct","Can’t live without","Call","Call now","Click here","Clearance","Deal ending soon",
      "Do it now","Do it today", "Don’t delete","Don’t hesitate", "Drastically reduced","Exclusive deal",
      "Get it now","Get it today","Get started now.","Hurry up","Important information regarding",
      "Instant","Limited time","New customers only","Now only","Offer expires","Once in a lifetime",
      "One time","Order now","Order today","Please read","Special promotion","Take action","Take action now",
      "This won’t last","Urgent","While stocks last","While supplies last","100%","50% off","All-new",
      "Bargain","Best price","Bonus","Digital marketing","Direct marketing","Email marketing","Fantastic deal",
      "Free access","Free consultation","Free hosting","Free gift","Free trial","Have you been turned down?",
      "Giving away","Great offer","Join millions of Americans","Incredible deal","Prize","Promise you",
      "Pure profit","Satisfaction guaranteed","Will not believe your eyes","Cutie","Hot babes","Hottie",
      "Kinky","Mature","Meet girls","Meet singles","Meet women","Sex","Sexy babes","Steamy","Acceptance",
      "Access","Avoid bankruptcy","Boss","Cancel","Card accepted","Certified","Very Cheap","Compare",
      "Compare rates","Congratulations","Credit card offers","Cures","Dear [personalization variable]",
      "Dear friend","Drastically reduced","Easy terms","Free grant money","Free hosting","Free info",
      "Free membership","Friend","Get out of debt","Giving away","Guarantee","Guaranteed","Have you been turned down?",
      "Hello","Information you requested","Join thousands","No age restrictions","No catch","No experience","No obligation",
      "No purchase necessary","No questions asked","No strings attached","Offer","Opportunity","Save big",
      "Winner","Winning","Win big","Won","You are a winner","You’ve been selected!","while you sleep","0% risk",
      "100% free","100% more","100% satisfaction","Additional income","All-natural","Amazing","At no cost",
      "Be your own boss","Big bucks","Billion","Billion dollars","Cash","Cash bonus","Consolidate debt and credit","Consolidate your debt",
      "Double your income","Earn","Earn cash","Earn extra cash","Earn per week","Eliminate bad credit",
      "Eliminate debt","Extra","Fantastic deal","Fast cash","Fast money","Financial freedom","Financially independent","Free investment",
      "Free money","Full refund","Get paid","Get out of debt","Get rid of debt","Home-based","Increase Income",
      "Increase sales","Increase traffic","Lose","Lose weight","Make money","Money back","No catch","No credit check",
      "No fees","No hidden costs","No investment","No purchase required","No questions asked","No strings attached",
      "Online business opportunity","Potential earnings","Pure profit","Removes wrinkles","Reverses aging",
      "Risk-free","Satisfaction guaranteed","Serious cash","Stop snoring","Vacation","Vacation offers","Weekend getaway",
      "Weight loss","While you sleep","Work from home","Addresses","Beneficiary","Billing","Casino","Celebrity","Cheap meds",
      "Collect child support","Compete for your business","Congratulations","Copy DVDs","Cures baldness",
      "Diet","Fast Viagra delivery","Growth hormone","Hidden","Human growth hormone","In accordance with laws",
      "Instant weight loss","Investment","Junk","Legal","Life insurance","Loan","Lottery","Luxury car",
      "Medicine","Message contains","Miracle","Money","Multi-level marketing","Nigerian","No medical exams",
      "No refunds","Offshore","Online degree","Online pharmacy","Passwords","Refinance","Request","Rolex",
      "Score","Social security number","Spam","Stops snoring","This is an ad","This isn’t spam","This isn’t junk","Undisclosed recipient",
      "University diplomas","Unsecured credit","Unsolicited","US dollars","Valium","Viagra","Vicodin","Warranty",
      "We are legal","Xanax"
    ];
  @ViewChild('analyzeModel', { static: false }) analyzeModel?: ModalDirective;
  constructor(private spinner: NgxSpinnerService,public totstr:ToastrService
    ,public router:Router,public service :UsService,public toastr:ToastrService) {}

  ngOnInit(): void {
    this.headersWithToken=localStorage.getItem('token')
    let data:any|undefined = jwtDecode(this.headersWithToken); 
    if(data){
      this.hubConnection=new signalR.HubConnectionBuilder().withUrl("http://localhost:13862/notisocke").build();
    if(this.hubConnection.state === signalR.HubConnectionState.Disconnected && this.connected === 1 ){
      console.log("this is the state inside f",this.hubConnection.state);
      this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
      this.connected=2;
     }

    this.hubConnection.on("ReceiveOne",(data)=>{
         this.GetData();
    });

      this.GetData();
      this.userid=data.UserId;
    }else{
      this.router.navigate(['']);
    }
  
  }
  
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event:Event) {
      //this.service.LogoutFromSystem();
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

     window.location.reload();
  
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
    //window.location.reload();
  
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
    
    //this.selectedMessageList=this.service.myContentData[this.currentIndex].messages;
    window.location.reload();
  
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

  PressToAnalyzeMessage(msg:string):number{
    let result=10;
    this.ArraysOfWord.forEach(function (value) {
      if (msg.match(value))
      { result= 88;}
      else if (msg.startsWith(value))
      {result= 100; }
      else if (msg.endsWith(value))
      {result= 61; }
      else if (msg.includes(value))
      { result= 93; }
      else
      { result= 10; }
  });
   
     return result;
    //return this.service.AnalyzeMessage(m);
    //window.location.reload();
  
  }

  CloseDialog(){
    this.analyzeModel?.hide();
  }



}
