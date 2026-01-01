import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoaderServiceService } from '../../../core/services/loader-service.service';
import { HomeService } from '../../../core/services/home.service';
import { CommonService } from '../../../core/services/common.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert.service';
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
    selectedStateCode: number = 0;
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
  states: any;
  selectedState: string | null = null;
  uid: string = '';
  password: string = '';
  stateCode: string = '';
  captchaValue: string = '';

  constructor(private modalService: NgbModal, private loaderService: LoaderServiceService, private apiservice: HomeService, private commonService: CommonService, private router: Router,private alertService: AlertService) { }

  async ngOnInit() {
    this.states = await this.commonService.loadState().toPromise();
    await this.createCaptcha();
  }
  loginType: 'mobile' | 'user' = 'user';

  openLogin(content: any) {
    debugger;
     if (!this.selectedStateCode || this.selectedStateCode.toString().trim() === '') {
      this.alertService.showWarning('Please select a state.');
      return;
    }

    this.modalRef = this.modalService.open(content, { centered: true, backdrop: false, backdropClass: 'backdrop', });
  }

  async createCaptcha(): Promise<void> {
    this.loaderService.show();
    try {
      const response = await firstValueFrom(this.apiservice.generateCaptcha());
      if (response.isSuccess) {
        this.captchaUrl = `data:image/png;base64, ${response.data.captcha}`;
        this.captchaId = response.data.captchaId;
      }
    } catch (error) {
      console.error('Error generating captcha:', error);
    } finally {
      this.loaderService.hide();
    }
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
    console.log('Verify OTP:', this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6);
  }

  moveFocus(event: KeyboardEvent, nextInput: any, prevInput: any) {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && target.value === '' && prevInput) {
      prevInput.focus();
    } else if (nextInput && target.value.length === 1) {
      nextInput.focus();
    }
  }

  async verifypassword(): Promise<void> {
    debugger;
    const payload = {
      uid: this.uid,
      password: this.password,
      stateCode: this.selectedStateCode,
      captchaId: this.captchaId,
      captchaValue: this.captch_input,
    };

    this.loaderService.show();
    try {
      const response = await this.apiservice.login(payload);
      if (response.isSuccess) {
        const userData = response.data;
        localStorage.setItem('token', userData.jwtToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('uid', userData.uid.trim());
        localStorage.setItem('roleId', userData.roleid);
        localStorage.setItem('panel', userData.panel);
        if (this.modalRef) {
          this.modalRef.close();
        }

        // navigate to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        console.warn('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      this.loaderService.hide();
    }
  }

}
