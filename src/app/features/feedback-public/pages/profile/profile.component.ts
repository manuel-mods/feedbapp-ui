import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user = {
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Juan Pérez',
    rating: 4,
    memberSince: '2024',
    bio: 'Me gusta la tecnología y la música. Soy fanático de los videojuegos y me encanta la comida italiana. 🎮🍕',
  };

  feedbackList = [
    {
      user: 'Carlos Martínez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      comment: 'La calidad del producto superó mis expectativas.',
      rating: 5,
      date: '02/11/2024',
    },
    {
      user: 'Lucía Fernández',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      comment: 'El producto llegó en buenas condiciones, aunque tardó un poco más.',
      rating: 4,
      date: '28/10/2024',
    },
    {
      user: 'Miguel Rodríguez',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      comment: 'Buena relación calidad-precio, sin embargo, el empaque podría mejorar.',
      rating: 3.5,
      date: '25/10/2024',
    },
    {
      user: 'Sofía López',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      comment: 'El producto es tal como se describe, y el servicio fue muy atento.',
      rating: 5,
      date: '20/10/2024',
    },
    {
      user: 'Javier Ortega',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      comment: 'Tuve algunos problemas con el producto, pero el servicio de atención fue rápido.',
      rating: 3,
      date: '15/10/2024',
    },
  ];
}
