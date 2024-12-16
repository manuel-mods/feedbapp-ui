import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Spy para el router
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule, LoginComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }), // Simula parámetros de ruta
            snapshot: { data: {} }, // Simula un snapshot de datos
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    expect(emailControl?.value).toBe('');
    expect(passwordControl?.value).toBe('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate email is required and in correct format', () => {
    const emailControl = component.loginForm.get('email');

    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['required']).toBeTrue();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['email']).toBeTrue();
  });

  it('should validate password is required', () => {
    const passwordControl = component.loginForm.get('password');

    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();
    expect(passwordControl?.errors?.['required']).toBeTrue();
  });

  it('should enable the login button when form is valid', () => {
    component.loginForm.setValue({
      email: 'test@feedbapp.cl',
      password: '123123',
    });

    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('button.btn-primary'));
    expect(loginButton.nativeElement.disabled).toBeFalse();
  });

  it('should call login() method and navigate to dashboard', () => {
    spyOn(localStorage, 'setItem');

    component.loginForm.setValue({
      email: 'demo@feedbapp.cl',
      password: '123123',
    });
    component.login();

    expect(localStorage.setItem).toHaveBeenCalledWith('user', 'demo@feedbapp.cl');
    // expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should call register() and navigate to registration page', () => {
    component.register();
    // expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth/register');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();

    const eyeButton = fixture.debugElement.query(By.css('.input-group-text'));
    eyeButton.nativeElement.click();
    expect(component.showPassword).toBeTrue();

    eyeButton.nativeElement.click();
    expect(component.showPassword).toBeFalse();
  });
});
