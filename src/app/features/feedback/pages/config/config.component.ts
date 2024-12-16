import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../../../core/services/feedback.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  configForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      acceptAnonymousFeedback: [false],
      showScore: [true],
      acceptFollowers: [false],
    });
  }
  _feedbacks: FeedbackService = inject(FeedbackService);

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      firstValueFrom(this._feedbacks.getUser(user)).then((data) => {
        this.configForm.patchValue(data);
      });
    }
  }
  async saveChanges() {
    if (this.configForm.valid) {
      const user = localStorage.getItem('user');
      try {
        await firstValueFrom(
          this._feedbacks.createOrUpdateUser({ email: user, ...this.configForm.value })
        );
      } catch (error) {
        console.error(error);
      }
      alert('Cambios guardados exitosamente.');
    } else {
      alert('Por favor, revisa los campos antes de guardar.');
    }
  }
}
