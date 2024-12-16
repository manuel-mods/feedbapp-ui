import { Component, inject } from '@angular/core';
import { FeedbackService } from '../../../../core/services/feedback.service';
import { first, firstValueFrom } from 'rxjs';

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
  loading = true;
  async ngOnInit() {
    try {
      const user = localStorage.getItem('user');
      const data = await firstValueFrom(this._feedbacks.getFeedbacks(user));
      this.feedbackList = data;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
  async reportFeedback(id: number) {
    const conf = confirm(`¿Estás seguro de reportar el feedback con ID ${id}?`);
    if (id) {
      try {
        await firstValueFrom(this._feedbacks.deleteFeedback(id));
        this.ngOnInit();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
