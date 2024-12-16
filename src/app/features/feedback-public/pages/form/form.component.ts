import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FeedbackService } from '../../../../core/services/feedback.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Route } from '@angular/router';

/**
 * Componente `FormComponent`
 *
 * Este componente permite a los usuarios enviar feedback mediante una interfaz
 * que incluye selección de puntuación con estrellas y un campo para comentarios opcionales.
 * Utiliza formularios reactivos para manejar la validación y el envío de datos.
 */
@Component({
  selector: 'app-form', // Selector del componente
  standalone: true, // Componente independiente, no requiere un módulo
  imports: [ReactiveFormsModule, NgClass], // Importaciones necesarias
  templateUrl: './form.component.html', // Ruta del archivo de plantilla
  styleUrl: './form.component.scss', // Ruta del archivo de estilos
})
export class FormComponent {
  /**
   * Lista de estrellas para seleccionar puntuación (1 a 5).
   */
  stars: any = [1, 2, 3, 4, 5];

  /**
   * Puntuación seleccionada por el usuario.
   * Inicialmente `0`.
   */
  selectedRating = 0;

  /**
   * Formulario reactivo para gestionar los datos del feedback.
   */
  feedbackForm: FormGroup;

  /**
   * Constructor del componente.
   *
   * @param fb - Servicio `FormBuilder` para inicializar el formulario reactivo.
   */
  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      rating: [this.selectedRating, [Validators.required, Validators.min(1)]],
      comment: ['', [Validators.maxLength(500), Validators.required]],
    });
  }

  /**
   * Establece la puntuación seleccionada por el usuario.
   *
   * @param star - Puntuación seleccionada (entre 1 y 5).
   */
  setStar(star: number): void {
    this.selectedRating = star;
    this.feedbackForm.patchValue({ rating: this.selectedRating });
  }

  /**
   * Envía el feedback ingresado por el usuario.
   * Si el formulario es válido, se imprime en la consola y se reinicia el formulario.
   * Si no es válido, se muestra una alerta.
   */
  _feedbacks: FeedbackService = inject(FeedbackService);

  submitFeedback(): void {
    if (this.feedbackForm.valid) {
      const feedback = this.feedbackForm.value;
      const feedbackData = {
        userId: localStorage.getItem('user'),
        content: feedback.comment,
        rating: feedback.rating,
        givenBy: 'anon',
      };
      // Llamar al servicio para enviar el feedback
      this._feedbacks.createFeedback(feedbackData).subscribe({
        next: (response) => {
          console.log('Feedback enviado:', response);
          alert('¡Gracias por tu feedback!');

          // Resetear el formulario después del envío exitoso
          this.feedbackForm.reset({ rating: 0, comment: '' });
          this.selectedRating = 0;
        },
        error: (err) => {
          console.error('Error enviando feedback:', err);
          alert('Ocurrió un error al enviar tu feedback. Por favor, inténtalo nuevamente.');
        },
      });
    } else {
      alert('Por favor selecciona una puntuación.');
    }
  }
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
