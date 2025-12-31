import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoaderServiceService } from '../../../core/services/loader-service.service';
import { HomeService } from '../../../core/services/home.service';
@Component({
  selector: 'app-homeheader',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule, InputTextModule, FormsModule
  ],
  templateUrl: './homeheader.component.html',
  styleUrl: './homeheader.component.css'
})
export class HomeheaderComponent {
  selectedStateCode: string = '0';
  mobileNumber: string = '';
  captch_input: string = '';
  otp1 = ''; otp2 = ''; otp3 = ''; otp4 = ''; otp5 = ''; otp6 = '';

  isOtpButton: boolean = true;
  isOtpTextVisible: boolean = false;
  isOtpVerfiy: boolean = false;
  isOtpReSendButton: boolean = false;
  captchaUrl = 'assets/images/captcha.jpg';
  mobileError: string = '';
  modalRef: any;
  captchaId: any;

  constructor(private modalService: NgbModal,private loaderService:LoaderServiceService,private apiservice:HomeService) { }

  ngOnInit(): void {
    // Load states
    // this.authService.getStates().subscribe((data: any[]) => {
    //   this.states = data;
    //});


    this.createCaptcha();
 
  }
   loginType: 'user' | 'mobile' = 'mobile';
  openLogin(content: any) {
    //this.ResetLoginModel();
    this.modalRef = this.modalService.open(content, { centered: true,backdrop: false, backdropClass: 'backdrop', });
  }

  createCaptcha(): void {
     this.loaderService.show();
    this.apiservice.generateCaptcha().subscribe(response => {
      this.loaderService.hide();
      if (response.isSuccess) {
        this.captchaUrl = `data:image/png;base64, ${response.data.captcha}`;
        this.captchaId = response.data.captchaId;
      }
      else {
        //this.alertService.showWarning(response.message);
      }
    });
  }



  checkMobile() {
    if (this.mobileNumber.length < 10) {
      this.mobileError = 'Mobile number must be 10 digits';
    } else {
      this.mobileError = '';
    }
  }

  verifyMobile() {
    console.log('Verify mobile:', this.mobileNumber);
    this.isOtpButton = false;
    this.isOtpTextVisible = true;
    this.isOtpVerfiy = true;
    this.isOtpReSendButton = true;
  }

  verfiyOTPUser() {
    console.log('Verify OTP:', this.otp1+this.otp2+this.otp3+this.otp4+this.otp5+this.otp6);
  }

  moveFocus(event: KeyboardEvent, nextInput: any, prevInput: any) {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && target.value === '' && prevInput) {
      prevInput.focus();
    } else if (nextInput && target.value.length === 1) {
      nextInput.focus();
    }
  }
}
