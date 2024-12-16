import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FeedbackService } from '../../../../core/services/feedback.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  _feedbacks: FeedbackService = inject(FeedbackService);
  feedbackList: any = [];

  user = {
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: '',
    email: '',
    rating: 4,
    memberSince: '2024',
    description: '',
  };
  loading = true;
  async ngOnInit() {
    this.user.email = localStorage.getItem('user') || 'User';
    try {
      const user = localStorage.getItem('user');
      const data = await firstValueFrom(this._feedbacks.getFeedbacks(user));
      const userData = await firstValueFrom(this._feedbacks.getUser(user));
      this.user = { ...this.user, ...userData };

      this.feedbackList = data;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  reportFeedback(id: number) {
    alert(`Feedback con ID ${id} reportado.`);
  }
}
