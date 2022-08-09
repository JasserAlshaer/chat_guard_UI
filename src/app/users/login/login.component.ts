import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

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
  constructor(private spinner: NgxSpinnerService,public totstr:ToastrService) {}
  name:string="";
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      
    }, 3000);
  }

  Login(){
    this.childModal?.show();
  }

  Register(){
    this.childModal?.show();
  }

}
