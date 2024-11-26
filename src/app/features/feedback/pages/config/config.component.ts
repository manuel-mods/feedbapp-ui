import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      name: ['Juan Pérez', [Validators.required, Validators.minLength(3)]],
      username: ['juan.perez', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.]+$')]],
      description: [
        'Apasionado de la tecnología y siempre en busca de mejorar mis productos gracias al feedback de mis clientes.',
        Validators.required,
      ],
      acceptAnonymousFeedback: [false],
      showScore: [true],
      acceptFollowers: [false],
    });
  }

  saveChanges() {
    if (this.configForm.valid) {
      console.log('Configuración guardada:', this.configForm.value);
      alert('Cambios guardados exitosamente.');
    } else {
      alert('Por favor, revisa los campos antes de guardar.');
    }
  }
}
