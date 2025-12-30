import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar/sidebar.component';
import { FooterComponent } from '../../shared/footer/footer/footer.component';
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,SidebarComponent,FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
