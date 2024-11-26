import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

/**
 * Componente de registro para Feedbapp.
 *
 * Este componente permite a los usuarios registrarse proporcionando un correo electrónico
 * y una contraseña. También incluye validaciones de requisitos de la contraseña.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  /**
   * Indicador para mostrar u ocultar la contraseña.
   */
  showPassword = false;

  /**
   * Validaciones en tiempo real para los requisitos de la contraseña.
   * - `minLength`: La contraseña debe tener al menos 8 caracteres.
   * - `maxLength`: La contraseña debe tener un máximo de 16 caracteres.
   * - `hasNumber`: La contraseña debe contener al menos un número.
   * - `hasSpecialChar`: La contraseña debe contener al menos un carácter especial.
   * - `hasLetter`: La contraseña debe contener al menos una letra.
   */
  requirements = {
    minLength: false,
    maxLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasLetter: false,
  };

  /**
   * Formulario reactivo para el registro del usuario.
   * - `email`: Campo obligatorio que debe contener un correo electrónico válido.
   * - `password`: Campo obligatorio que debe cumplir con los requisitos mínimos y máximos de la contraseña.
   */
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
  });

  /**
   * Constructor del componente.
   *
   * @param router - Servicio para navegación entre rutas.
   */
  constructor(private router: Router) {}

  /**
   * Alternar la visibilidad de la contraseña.
   */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Validar los requisitos de la contraseña en tiempo real.
   *
   * Este método verifica que la contraseña cumpla con:
   * - Longitud mínima de 8 caracteres.
   * - Longitud máxima de 16 caracteres.
   * - Al menos un número.
   * - Al menos un carácter especial.
   * - Al menos una letra.
   */
  checkPasswordRequirements() {
    const password = this.registerForm.get('password')?.value || '';
    this.requirements.minLength = password.length >= 8;
    this.requirements.maxLength = password.length <= 16;
    this.requirements.hasNumber = /\d/.test(password);
    this.requirements.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    this.requirements.hasLetter = /[a-zA-Z]/.test(password);
  }

  /**
   * Verificar si todos los requisitos de la contraseña están cumplidos.
   *
   * @returns `true` si todos los requisitos son válidos, `false` de lo contrario.
   */
  allRequirementsValid(): boolean {
    return Object.values(this.requirements).every((value) => value);
  }

  /**
   * Manejar el proceso de registro del usuario.
   *
   * Si el formulario o los requisitos de la contraseña no son válidos, muestra un mensaje
   * de error. De lo contrario, simula el registro y redirige al dashboard.
   */
  register() {
    if (this.registerForm.invalid || !this.allRequirementsValid()) {
      alert('Por favor, asegúrate de que todos los campos estén correctos.');
      return;
    }

    // Simular registro
    alert('¡Registro exitoso! Bienvenido a Feedbapp.');
    this.router.navigateByUrl('/dashboard');
  }
}
