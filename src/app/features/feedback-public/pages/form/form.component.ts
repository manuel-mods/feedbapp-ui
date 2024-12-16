import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FeedbackService } from '../../../../core/services/order.service';

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
   * Información del usuario que recibirá el feedback.
   */
  user = {
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg', // URL del avatar del usuario
    name: 'Juan Pérez', // Nombre del usuario
    memberSince: '2024', // Año de registro del usuario
    bio: 'Me gusta la tecnología y la música. Soy fanático de los videojuegos y me encanta la comida italiana. 🎮🍕', // Descripción del usuario
  };

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
      comment: [''],
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
}
