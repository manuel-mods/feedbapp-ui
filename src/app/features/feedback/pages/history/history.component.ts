import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
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
    {
      id: 2,
      user: 'Lucía Fernández',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      comment: 'El producto llegó en buenas condiciones, aunque tardó un poco más de lo esperado.',
      rating: 4,
      date: '28/10/2024',
    },
    {
      id: 3,
      user: 'Miguel Rodríguez',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      comment: 'Buena relación calidad-precio, sin embargo, el empaque podría mejorar.',
      rating: 3.5,
      date: '25/10/2024',
    },
    {
      id: 4,
      user: 'Sofía López',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      comment: 'El producto es tal como se describe, y el servicio fue muy atento.',
      rating: 5,
      date: '20/10/2024',
    },
    {
      id: 5,
      user: 'Javier Ortega',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      comment:
        'Tuve algunos problemas con el producto, pero el servicio de atención fue rápido en responder.',
      rating: 3,
      date: '15/10/2024',
    },
  ];

  reportFeedback(id: number) {
    alert(`Feedback con ID ${id} reportado.`);
  }
}
