import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer/footer.component';
import { HomeheaderComponent } from "../../shared/header/homeheader/homeheader.component";
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet,   FooterComponent, HomeheaderComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
