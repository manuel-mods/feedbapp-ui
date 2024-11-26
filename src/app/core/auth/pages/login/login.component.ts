import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { firstValueFrom, timer } from 'rxjs';

/**
 * Componente `LoginComponent`
 *
 * Este componente gestiona el formulario de inicio de sesión, permitiendo a los usuarios ingresar
 * sus credenciales y ser redirigidos a otras partes de la aplicación tras autenticarse exitosamente.
 */
@Component({
  selector: 'app-login', // Selector del componente
  standalone: true, // Componente independiente, no requiere un módulo
  imports: [ReactiveFormsModule, RouterLink], // Módulos necesarios para el formulario reactivo y navegación
  templateUrl: './login.component.html', // Ruta del archivo de plantilla
  styleUrl: './login.component.scss', // Ruta del archivo de estilos
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Esquema que permite elementos personalizados
})
export class LoginComponent implements OnInit {
  /**
   * Servicio de autenticación para manejar las credenciales del usuario.
   */
  _authService: any = {};

  /**
   * Servicio de carga para mostrar el estado de "cargando".
   */
  _loadingService: any = {};

  /**
   * Servicio de notificaciones para mostrar mensajes al usuario.
   */
  _toastrService: any = {};

  /**
   * Enlace al servicio de enrutamiento para navegar entre vistas.
   */
  router = inject(Router);

  /**
   * Formulario reactivo para gestionar los campos de correo y contraseña.
   */
  loginForm!: FormGroup;

  /**
   * Control para alternar la visibilidad de la contraseña.
   * Por defecto, las contraseñas no son visibles.
   */
  showPassword = false;

  /**
   * Constructor del componente.
   *
   * @param route - Servicio de enrutamiento proporcionado por Angular.
   */
  constructor(private route: Router) {
    this.loginForm = new FormGroup({
      /**
       * Campo para el correo electrónico del usuario.
       * Validaciones:
       * - Obligatorio
       * - Debe ser un correo válido.
       */
      email: new FormControl('', [Validators.required, Validators.email]),

      /**
       * Campo para la contraseña del usuario.
       * Validaciones:
       * - Obligatorio.
       */
      password: new FormControl('', Validators.required),
    });
  }

  /**
   * Método del ciclo de vida `ngOnInit`.
   * Se utiliza para inicializar el componente.
   */
  async ngOnInit() {}

  /**
   * Navega a la página de registro de usuario.
   */
  register() {
    this.route.navigateByUrl('/auth/register');
  }

  /**
   * Método para iniciar sesión.
   *
   * Este método valida las credenciales del usuario. Si las credenciales coinciden
   * con las de prueba (`demo@feedbapp.cl` y `123123`), redirige al usuario al
   * dashboard de la aplicación.
   */
  async login() {
    try {
      if (
        this.loginForm.value.email === 'demo@feedbapp.cl' &&
        this.loginForm.value.password === '123123'
      ) {
        this.router.navigateByUrl('/dashboard');
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}
