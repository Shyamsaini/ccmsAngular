import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  template: `<nav class="navbar">
      <span>CCMS Admin</span>
    </nav> `
})
export class HeaderComponent {

}
