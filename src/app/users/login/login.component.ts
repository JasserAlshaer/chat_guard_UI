import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { UsService } from '../us.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../../../assets/Style/css/main.css',
    '../../../assets/Style/css/util.css',
    '../../../assets/Style/vendor/daterangepicker/daterangepicker.css',
    '../../../assets/Style/vendor/select2/select2.min.css',
    '../../../assets/Style/vendor/animsition/css/animsition.min.css',
    '../../../assets/Style/vendor/css-hamburgers/hamburgers.min.css',
    '../../../assets/Style/vendor/animate/animate.css',
    '../../../assets/Style/fonts/Linearicons-Free-v1.0.0/icon-font.min.css',
    '../../../assets/Style/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
  ]
})
export class LoginComponent implements OnInit {
  @ViewChild('subscribeModel', { static: false }) childModal?: ModalDirective;
  constructor(private spinner: NgxSpinnerService,public totstr:ToastrService,public service :UsService) {}
  email:string="";
  phone:string="";
  name:string="";
  password:string="";
  email2:string="";
  password2:string="";
  birthDate:Date=new Date();
  image:string="";
//  files: any[]=[];

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      
    }, 3000);
  }
  Login(){
      const login={
        "email":this.email2,
        "password":this.password2
      };

      this.service.LoginInSystem(login);

  }
  RegisterNewAccount(){
    const account={
      "email":this.email,
      "password":this.password,
      "userName":this.name,
      "phone":this.phone,
      "birthDate":this.birthDate,
      "fullName":this.name,
      "profileImage":this.image
    };

    this.service.Register(account);
    this.childModal?.hide();
  }
  ColseDilog(){
    this.childModal?.hide();
  }
  Register(){
    this.childModal?.show();
  }
  onFileChange(event: any) {
    const reader = new FileReader();
  
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.image = reader.result as string;    
      };
    }
  }
}
