import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [],
  template: `
    <aside class="sidebar">
      <ul>
        <li routerLink="/dashboard" routerLinkActive="active">Dashboard</li>
        <li routerLink="/users" routerLinkActive="active">Users</li>
      </ul>
    </aside>
  `
})
export class SidebarComponent {


ngAfterViewInit() {
  setTimeout(() => {
    $('[data-widget="treeview"]').Treeview('init');
  });
}
}
