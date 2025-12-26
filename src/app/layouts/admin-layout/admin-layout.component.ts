import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar/sidebar.component';
import { FooterComponent } from '../../shared/footer/footer/footer.component';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,SidebarComponent,FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
