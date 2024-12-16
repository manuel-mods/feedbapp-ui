import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  // Get all feedbacks
  getFeedbacks(user: any): Observable<any[]> {
    return this.http.get<any[]>(
      'https://feedback-back-dot-feedbapp-cl.uc.r.appspot.com/api/feedback/' + user
    );
  }

  // Get feedback by ID
  getFeedback(id: string): Observable<any> {
    return this.http.get<any>(
      'https://feedback-back-dot-feedbapp-cl.uc.r.appspot.com/api/feedback/' + id
    );
  }

  // Create new feedback
  createFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(
      'https://feedback-back-dot-feedbapp-cl.uc.r.appspot.com/api/feedback',
      feedback
    );
  }

  // Delete feedback by ID
  deleteFeedback(id: any): Observable<any> {
    return this.http.delete<any>(
      'https://feedback-back-dot-feedbapp-cl.uc.r.appspot.com/api/feedback/' + id
    );
  }

  // Update feedback status
  updateFeedbackStatus(id: string, status: string, comment?: string): Observable<any> {
    return this.http.patch<any>(
      'https://feedback-back-dot-feedbapp-cl.uc.r.appspot.com/api/feedback/' + id + '/status',
      {
        status,
        comment,
      }
    );
  }

  // Create or update user
  createOrUpdateUser(user: any): Observable<any> {
    return this.http.post<any>(
      'https://feedback-back-dot-feedbapp-cl.uc.r.appspot.com/api/feedback/user',
      user
    );
  }

  getUser(user: any): Observable<any> {
    return this.http.get<any>(
      'https://feedback-back-dot-feedbapp-cl.uc.r.appspot.com/api/feedback/user/' + user
    );
  }
}
