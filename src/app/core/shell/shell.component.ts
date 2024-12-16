import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterLinkActive],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  _router = inject(Router);
  constructor() {
    this.user = localStorage.getItem('user') || 'User';
  }

  logout() {
    this._router.navigateByUrl('/auth/login');
  }
  _titleService = inject(TitleService);
  title = '';
  user: string = 'User';
  ngOnInit(): void {
    this._titleService.title$.subscribe((newTitle) => {
      console.log('newTitle', newTitle);
      this.title = newTitle;
    });

    // if route change hidden menu
    this._router.events.subscribe((val) => {
      this.menuOpen = false;
    });
  }
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
