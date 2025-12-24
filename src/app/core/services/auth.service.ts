import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);

  constructor() {}

  logout(): void {
    localStorage.removeItem('jwttoken');
    this.router.navigate(['/login']);
  }
  getUserRole(): string | null {
  const token = localStorage.getItem('jwttoken');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.role;
}
}
