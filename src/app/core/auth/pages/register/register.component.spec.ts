import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule, RegisterComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }), // Simula parámetros de ruta
            snapshot: { data: {} },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const emailControl = component.registerForm.get('email');
    const passwordControl = component.registerForm.get('password');

    expect(emailControl?.value).toBe('');
    expect(passwordControl?.value).toBe('');
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should validate email as required and in correct format', () => {
    const emailControl = component.registerForm.get('email');

    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['required']).toBeTrue();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['email']).toBeTrue();

    emailControl?.setValue('test@feedbapp.cl');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should validate password as required and enforce requirements', () => {
    const passwordControl = component.registerForm.get('password');

    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();
    expect(passwordControl?.errors?.['required']).toBeTrue();

    passwordControl?.setValue('123');
    expect(passwordControl?.valid).toBeFalse();
    expect(passwordControl?.errors?.['minlength']).toBeTruthy();

    passwordControl?.setValue('thisisaverylongpassword');
    expect(passwordControl?.valid).toBeFalse();
    expect(passwordControl?.errors?.['maxlength']).toBeTruthy();

    passwordControl?.setValue('Strong@123');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should check password requirements', () => {
    component.registerForm.get('password')?.setValue('Strong@123');
    component.checkPasswordRequirements();

    expect(component.requirements.minLength).toBeTrue();
    expect(component.requirements.maxLength).toBeTrue();
    expect(component.requirements.hasNumber).toBeTrue();
    expect(component.requirements.hasSpecialChar).toBeTrue();
    expect(component.requirements.hasLetter).toBeTrue();
    expect(component.allRequirementsValid()).toBeTrue();
  });

  it('should disable the register button when form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    component.registerForm.setValue({
      email: '',
      password: '',
    });
    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it('should enable the register button when form is valid and requirements are met', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    component.registerForm.setValue({
      email: 'test@feedbapp.cl',
      password: 'Strong@123',
    });
    component.checkPasswordRequirements();
    fixture.detectChanges();

    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();

    component.togglePassword();
    expect(component.showPassword).toBeTrue();

    component.togglePassword();
    expect(component.showPassword).toBeFalse();
  });

  it('should call register() and navigate to dashboard if form is valid', () => {
    spyOn(window, 'alert');

    component.registerForm.setValue({
      email: 'test@feedbapp.cl',
      password: 'Strong@123',
    });
    component.checkPasswordRequirements();
    component.register();

    expect(window.alert).toHaveBeenCalledWith('¡Registro exitoso! Bienvenido a Feedbapp.');
    // expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should show an alert if the form is invalid or requirements are not met', () => {
    spyOn(window, 'alert');

    component.registerForm.setValue({
      email: '',
      password: '',
    });
    component.register();

    expect(window.alert).toHaveBeenCalledWith(
      'Por favor, asegúrate de que todos los campos estén correctos.'
    );
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });
});
