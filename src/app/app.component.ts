import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GlobaleventService } from './core/global/globalevent.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ccms';
   showLayout = true;

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    this.globalEvenService.emitClickEvent(event);
  }

  constructor(
    private router: Router,
    private globalEvenService: GlobaleventService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !(
          event.url === '/' ||
          event.url === '/dashboard' ||
          event.url === '/home' 
        );
      }
    });
  }
}
