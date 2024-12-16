import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FeedbackService } from '../../../../core/services/feedback.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgClass, RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private route = inject(ActivatedRoute);
  private feedbackService = inject(FeedbackService);

  user: any = {
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: '',
    email: '',
    rating: 4,
    memberSince: '2024',
    bio: '',
  };

  feedbackList: any[] = [];
  loading = true;

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id') || '';
    try {
      const [userData, feedbackData] = await Promise.all([
        firstValueFrom(this.feedbackService.getUser(userId)),
        firstValueFrom(this.feedbackService.getFeedbacks(userId)),
      ]);

      this.user = { ...this.user, ...userData };
      this.feedbackList = feedbackData;
    } catch (error) {
      console.error('Error fetching user or feedback data:', error);
    } finally {
      this.loading = false;
    }
  }
}
