import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    expect(emailControl?.value).toBe('');
    expect(passwordControl?.value).toBe('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('debería validar que el correo es requerido', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['required']).toBeTrue();
  });

  it('debería validar que el correo tiene un formato correcto', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['email']).toBeTrue();
  });

  it('debería validar que la contraseña es requerida', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();
    expect(passwordControl?.errors?.['required']).toBeTrue();
  });

  it('debería permitir iniciar sesión con credenciales válidas', async () => {
    component.loginForm.setValue({
      email: 'demo@feedbapp.cl',
      password: '123123',
    });

    await component.login();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('debería no hacer nada si las credenciales son inválidas', async () => {
    component.loginForm.setValue({
      email: 'invalid@feedbapp.cl',
      password: 'wrongpassword',
    });

    await component.login();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  it('debería alternar la visibilidad de la contraseña', () => {
    expect(component.showPassword).toBeFalse();
    component.showPassword = true;
    expect(component.showPassword).toBeTrue();
  });

  it('debería navegar a la página de registro', () => {
    component.register();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/auth/register');
  });
});
