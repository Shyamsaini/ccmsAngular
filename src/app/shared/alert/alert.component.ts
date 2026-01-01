import { Component, Inject, OnInit } from '@angular/core';
import { AlertMessage, AlertService } from '../../core/services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  message: string = '';
 type: 'success' | 'error' | 'warning' = 'success'; 

  constructor(@Inject(AlertService) private alertService: AlertService) {}

  ngOnInit(): void {

    this.alertService.alert$.subscribe((alert: AlertMessage) => {
      this.message = alert.message;
      this.type = alert.type;

      if (this.message) {
        setTimeout(() => {
          this.message = '';
        }, 6000);
      }
    });
  }
}
