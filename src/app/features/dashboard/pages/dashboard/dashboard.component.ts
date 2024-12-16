import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  feedbacksGiven: number = 0;
  feedbacksReceived: number = 0;
  averageScore: number = 0;
  followersCount: number = 0;
}
