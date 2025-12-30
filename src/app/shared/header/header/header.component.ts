import { Component } from '@angular/core';
declare var $: any;
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



ngAfterViewInit() {
  setTimeout(() => {
    $('[data-widget="pushmenu"]').PushMenu();
  });
}

}
