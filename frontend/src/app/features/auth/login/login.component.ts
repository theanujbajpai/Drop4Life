import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 p-8 sm:p-10 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-glass dark:shadow-glass-dark">
        <!-- Header -->
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
            🩸
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white font-display">Welcome Back</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">Sign in to your Drop4Life account</p>
        </div>

        <!-- Quick Fill Demo Pills -->
        <div class="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-2">
          <span class="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Quick Fill Test Accounts:</span>
          <div class="flex flex-wrap gap-1.5">
            <button type="button" (click)="fillDemo('rahul.sharma@gmail.com')"
                    class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300">
              Donor (B+)
            </button>
            <button type="button" (click)="fillDemo('priya.patel@gmail.com')"
                    class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300">
              Donor (O-)
            </button>
            <button type="button" (click)="fillDemo('sunita.gupta@gmail.com')"
                    class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300">
              Requester
            </button>
            <button type="button" (click)="fillDemo('admin@drop4life.com')"
                    class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300">
              Admin
            </button>
          </div>
        </div>

        <!-- Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Error alert -->
          <div *ngIf="errorMessage" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 font-medium">
            {{ errorMessage }}
          </div>

          <!-- Email -->
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
            <input type="email" formControlName="email" placeholder="name@domain.com"
                   class="w-full px-4 py-3 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                   [ngClass]="{'border-red-500': f['email'].touched && f['email'].invalid}">
            <p *ngIf="f['email'].touched && f['email'].errors?.['required']" class="text-[11px] text-red-500">Email is required</p>
            <p *ngIf="f['email'].touched && f['email'].errors?.['email']" class="text-[11px] text-red-500">Valid email format required</p>
          </div>

          <!-- Password -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" class="text-xs text-red-600 hover:underline">Forgot password?</a>
            </div>
            <input type="password" formControlName="password" placeholder="••••••••"
                   class="w-full px-4 py-3 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                   [ngClass]="{'border-red-500': f['password'].touched && f['password'].invalid}">
            <p *ngIf="f['password'].touched && f['password'].errors?.['required']" class="text-[11px] text-red-500">Password is required</p>
          </div>

          <button type="submit" [disabled]="loginForm.invalid || isLoading"
                  class="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2">
            <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </form>

        <div class="text-center text-xs text-gray-500 dark:text-gray-400">
          Don't have an account yet?
          <a routerLink="/register" class="text-red-600 font-bold hover:underline ml-1">Create an account</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  fillDemo(email: string): void {
    this.loginForm.patchValue({
      email,
      password: 'Password@123'
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastService.success(`Welcome back, ${res.fullName}!`);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
        } else {
          switch (res.role) {
            case 'ADMIN': this.router.navigate(['/dashboard/admin']); break;
            case 'HOSPITAL': this.router.navigate(['/dashboard/hospital']); break;
            case 'REQUESTER': this.router.navigate(['/dashboard/requester']); break;
            default: this.router.navigate(['/dashboard/donor']); break;
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password. Please try again.';
      }
    });
  }
}
