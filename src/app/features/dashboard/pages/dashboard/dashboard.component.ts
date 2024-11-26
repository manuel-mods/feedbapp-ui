import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  feedbacksGiven: number = 23;
  feedbacksReceived: number = 15;
  averageScore: number = 4.5;
  followersCount: number = 100;
}
