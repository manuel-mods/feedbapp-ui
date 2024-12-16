import { Component, inject } from '@angular/core';
import { FeedbackService } from '../../../../core/services/order.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  _feedbacks: FeedbackService = inject(FeedbackService);
  feedbackList: any = [];
  async ngOnInit() {
    try {
      const user = localStorage.getItem('user');
      const data = await firstValueFrom(this._feedbacks.getFeedbacks(user));
      this.feedbackList = data;
    } catch (error) {
      console.error(error);
    }
  }
  reportFeedback(id: number) {
    alert(`Feedback con ID ${id} reportado.`);
  }
}
