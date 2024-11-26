import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterLinkActive],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  profileName = 'Abogado';
  change(type: string) {
    this.profileName = type;
    localStorage.setItem('profile', type);
    // reload page
    if (type == 'Abogado') {
      this._router.navigateByUrl('/dashboard');
    } else {
      this._router.navigateByUrl('/judicial');
    }
  }
  _router = inject(Router);

  logout() {
    this._router.navigateByUrl('/auth/login');
  }
  _titleService = inject(TitleService);
  title = '';

  ngOnInit(): void {
    this._titleService.title$.subscribe((newTitle) => {
      console.log('newTitle', newTitle);
      this.title = newTitle;
    });
    this.profileName = localStorage.getItem('profile') || 'Abogado';
  }
}
