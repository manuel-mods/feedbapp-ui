import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos', () => {
    const emailControl = component.registerForm.get('email');
    const passwordControl = component.registerForm.get('password');

    expect(emailControl?.value).toBe('');
    expect(passwordControl?.value).toBe('');
    expect(component.registerForm.valid).toBeFalse();
  });

  it('debería validar que el correo es requerido', () => {
    const emailControl = component.registerForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['required']).toBeTrue();
  });

  it('debería validar que el correo tiene un formato correcto', () => {
    const emailControl = component.registerForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['email']).toBeTrue();
  });

  it('debería validar que la contraseña es requerida', () => {
    const passwordControl = component.registerForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();
    expect(passwordControl?.errors?.['required']).toBeTrue();
  });

  it('debería validar que la contraseña cumple con los requisitos', () => {
    const passwordControl = component.registerForm.get('password');
    passwordControl?.setValue('123');
    expect(passwordControl?.valid).toBeFalse();
    expect(passwordControl?.errors?.['minlength']).toBeTruthy();

    passwordControl?.setValue('thisisaverylongpassword');
    expect(passwordControl?.valid).toBeFalse();
    expect(passwordControl?.errors?.['maxlength']).toBeTruthy();
  });

  it('debería verificar que todos los requisitos de contraseña se cumplen', () => {
    component.registerForm.get('password')?.setValue('Strong@123');
    component.checkPasswordRequirements();

    expect(component.requirements.minLength).toBeTrue();
    expect(component.requirements.maxLength).toBeTrue();
    expect(component.requirements.hasNumber).toBeTrue();
    expect(component.requirements.hasSpecialChar).toBeTrue();
    expect(component.requirements.hasLetter).toBeTrue();
    expect(component.allRequirementsValid()).toBeTrue();
  });

  it('debería alternar la visibilidad de la contraseña', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePassword();
    expect(component.showPassword).toBeTrue();
  });

  it('debería mostrar un mensaje de error si el formulario es inválido al registrarse', () => {
    spyOn(window, 'alert');
    component.registerForm.setValue({ email: '', password: '' });
    component.register();

    expect(window.alert).toHaveBeenCalledWith(
      'Por favor, asegúrate de que todos los campos estén correctos.'
    );
  });

  it('debería registrar al usuario y redirigir al dashboard si el formulario es válido', () => {
    spyOn(window, 'alert');
    component.registerForm.setValue({
      email: 'test@feedbapp.cl',
      password: 'Strong@123',
    });
    component.checkPasswordRequirements();
    component.register();

    expect(window.alert).toHaveBeenCalledWith('¡Registro exitoso! Bienvenido a Feedbapp.');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });
});
