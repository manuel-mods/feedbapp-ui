import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user = {
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Juan Pérez',
    email: 'demo@feedbapp.cl',
    username: '@juan.perez',
    rating: 4,
    memberSince: '2024',
    bio: 'Me gusta la tecnología y la música. Soy fanático de los videojuegos y me encanta la comida italiana. 🎮🍕',
  };

  feedbackList = [
    {
      id: 1,
      user: 'Carlos Martínez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      comment:
        'La calidad del producto superó mis expectativas. Excelente atención y rapidez en la entrega.',
      rating: 5,
      date: '02/11/2024',
    },
    // ... más feedbacks
  ];

  reportFeedback(id: number) {
    alert(`Feedback con ID ${id} reportado.`);
  }
}
