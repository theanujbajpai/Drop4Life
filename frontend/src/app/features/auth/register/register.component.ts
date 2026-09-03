import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { CustomValidators } from '../../../core/validators/custom.validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div class="p-8 sm:p-10 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-glass dark:shadow-glass-dark space-y-8">
        <!-- Header -->
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
            🩸
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">Create Your Account</h2>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Join the Drop4Life life-saving network</p>
        </div>

        <!-- Role Selector Buttons -->
        <div class="space-y-2">
          <label class="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">I am registering as:</label>
          <div class="grid grid-cols-3 gap-3">
            <button type="button" (click)="setRole('DONOR')"
                    [ngClass]="selectedRole === 'DONOR' ? 'border-red-600 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 ring-2 ring-red-500' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'"
                    class="p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all flex flex-col items-center gap-1">
              <span class="text-2xl">❤️</span>
              <span>Blood Donor</span>
            </button>
            <button type="button" (click)="setRole('REQUESTER')"
                    [ngClass]="selectedRole === 'REQUESTER' ? 'border-red-600 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 ring-2 ring-red-500' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'"
                    class="p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all flex flex-col items-center gap-1">
              <span class="text-2xl">🙏</span>
              <span>Recipient / Family</span>
            </button>
            <button type="button" (click)="setRole('HOSPITAL')"
                    [ngClass]="selectedRole === 'HOSPITAL' ? 'border-red-600 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 ring-2 ring-red-500' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'"
                    class="p-4 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all flex flex-col items-center gap-1">
              <span class="text-2xl">🏥</span>
              <span>Hospital / Bank</span>
            </button>
          </div>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div *ngIf="errorMessage" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 font-medium">
            {{ errorMessage }}
          </div>

          <!-- Personal Information Section -->
          <div class="space-y-4">
            <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
              1. Basic Information
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Full Name -->
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Full Name *</label>
                <input type="text" formControlName="fullName" placeholder="e.g. Rahul Sharma"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                       [ngClass]="{'border-red-500': f['fullName'].touched && f['fullName'].invalid}">
                <p *ngIf="f['fullName'].touched && f['fullName'].errors?.['required']" class="text-[11px] text-red-500">Name is required (2-100 chars)</p>
              </div>

              <!-- Email -->
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Email Address *</label>
                <input type="email" formControlName="email" placeholder="name@domain.com"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                       [ngClass]="{'border-red-500': f['email'].touched && f['email'].invalid}">
                <p *ngIf="f['email'].touched && f['email'].invalid" class="text-[11px] text-red-500">Valid email required</p>
              </div>

              <!-- Phone (Indian 10-digit) -->
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Mobile Number (10 digits) *</label>
                <input type="tel" formControlName="phone" placeholder="98XXXXXXXX" maxlength="10"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                       [ngClass]="{'border-red-500': f['phone'].touched && f['phone'].invalid}">
                <p *ngIf="f['phone'].touched && f['phone'].invalid" class="text-[11px] text-red-500">Enter valid 10-digit Indian number</p>
              </div>

              <!-- Blood Group -->
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Blood Group *</label>
                <select formControlName="bloodGroup"
                        class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white">
                  <option value="" disabled>Select Blood Group</option>
                  <option value="A_POSITIVE">A+ (A Positive)</option>
                  <option value="A_NEGATIVE">A- (A Negative)</option>
                  <option value="B_POSITIVE">B+ (B Positive)</option>
                  <option value="B_NEGATIVE">B- (B Negative)</option>
                  <option value="AB_POSITIVE">AB+ (AB Positive)</option>
                  <option value="AB_NEGATIVE">AB- (AB Negative)</option>
                  <option value="O_POSITIVE">O+ (O Positive)</option>
                  <option value="O_NEGATIVE">O- (O Negative)</option>
                </select>
              </div>

              <!-- Date of Birth -->
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Date of Birth *</label>
                <input type="date" formControlName="dateOfBirth"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                       [ngClass]="{'border-red-500': f['dateOfBirth'].touched && f['dateOfBirth'].invalid}">
                <p *ngIf="f['dateOfBirth'].touched && f['dateOfBirth'].errors?.['ageOutOfRange']" class="text-[11px] text-red-500">
                  Donors must be between 18 and 65 years old
                </p>
              </div>

              <!-- Gender -->
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Gender *</label>
                <select formControlName="gender"
                        class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <!-- Password -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Password (8+ chars, upper, lower, digit, special) *</label>
                <input type="password" formControlName="password" placeholder="••••••••"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                       [ngClass]="{'border-red-500': f['password'].touched && f['password'].invalid}">
                <p *ngIf="f['password'].touched && f['password'].errors?.['weakPassword']" class="text-[11px] text-red-500">
                  Must have 1 uppercase, 1 lowercase, 1 number, and 1 special symbol
                </p>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Confirm Password *</label>
                <input type="password" formControlName="confirmPassword" placeholder="••••••••"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                       [ngClass]="{'border-red-500': f['confirmPassword'].touched && f['confirmPassword'].invalid}">
                <p *ngIf="f['confirmPassword'].touched && f['confirmPassword'].errors?.['fieldsMismatched']" class="text-[11px] text-red-500">
                  Passwords do not match
                </p>
              </div>
            </div>
          </div>

          <!-- Location Section -->
          <div class="space-y-4">
            <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
              2. Location & Address
            </h3>
            <div class="space-y-3">
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Address / Area *</label>
                <input type="text" formControlName="address" placeholder="e.g. Flat 402, Green Avenue, Sector 62"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">City *</label>
                  <input type="text" formControlName="city" placeholder="Noida / Delhi"
                         class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">State *</label>
                  <input type="text" formControlName="state" placeholder="Uttar Pradesh"
                         class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Pincode (6 digits) *</label>
                  <input type="text" formControlName="pincode" placeholder="201301" maxlength="6"
                         class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                         [ngClass]="{'border-red-500': f['pincode'].touched && f['pincode'].invalid}">
                  <p *ngIf="f['pincode'].touched && f['pincode'].invalid" class="text-[11px] text-red-500">6 digits required</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Donor Eligibility Section (Shown only for Donors) -->
          <div *ngIf="selectedRole === 'DONOR'" class="space-y-4 p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
            <h3 class="text-sm font-bold text-red-800 dark:text-red-300 uppercase tracking-wider">
              3. Donor Medical Eligibility
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Body Weight (kg) *</label>
                <input type="number" formControlName="weight" placeholder="e.g. 65" min="45"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                       [ngClass]="{'border-red-500': f['weight'].touched && f['weight'].invalid}">
                <p *ngIf="f['weight'].touched && f['weight'].errors?.['weightUnderMin']" class="text-[11px] text-red-500">
                  Minimum body weight for donation is 45 kg
                </p>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Last Donation Date (if any)</label>
                <input type="date" formControlName="lastDonationDate"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Known Medical Conditions / Allergies (Optional)</label>
              <textarea formControlName="medicalConditions" rows="2" placeholder="e.g. None or mild hypertension"
                        class="w-full px-3.5 py-2 rounded-xl text-sm border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"></textarea>
            </div>
          </div>

          <!-- Hospital Specific Fields -->
          <div *ngIf="selectedRole === 'HOSPITAL'" class="space-y-4 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
            <h3 class="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
              3. Hospital / Blood Bank Credentials
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Hospital / Facility Name *</label>
                <input type="text" formControlName="organizationName" placeholder="e.g. Apollo Hospital"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">State Medical License / Reg No *</label>
                <input type="text" formControlName="licenseNumber" placeholder="e.g. DL-HOSP-2024"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              </div>
            </div>
          </div>

          <!-- Terms Checkbox -->
          <div class="flex items-start gap-2 pt-2">
            <input type="checkbox" id="terms" formControlName="termsAccepted" class="mt-1 rounded text-red-600 focus:ring-red-500">
            <label for="terms" class="text-xs text-gray-600 dark:text-gray-400">
              I certify that all details provided are accurate and agree to Drop4Life's
              <a href="#" class="text-red-600 underline">Terms of Service</a> and
              <a href="#" class="text-red-600 underline">Healthcare Consent Policy</a>.
            </label>
          </div>

          <!-- Submit Button -->
          <button type="submit" [disabled]="registerForm.invalid || isLoading"
                  class="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-50 text-white font-bold text-base shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2">
            <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>{{ isLoading ? 'Creating account...' : 'Complete Registration' }}</span>
          </button>
        </form>

        <div class="text-center text-xs text-gray-500 dark:text-gray-400">
          Already registered?
          <a routerLink="/login" class="text-red-600 font-bold hover:underline ml-1">Sign in here</a>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  selectedRole: 'DONOR' | 'REQUESTER' | 'HOSPITAL' = 'DONOR';
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.strongPassword()]],
      confirmPassword: ['', [Validators.required, CustomValidators.matchFields('password')]],
      phone: ['', [Validators.required, CustomValidators.phone()]],
      dateOfBirth: ['1998-01-01', [Validators.required, CustomValidators.ageRange(18, 65)]],
      gender: ['male', [Validators.required]],
      bloodGroup: ['B_POSITIVE', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, CustomValidators.pincode()]],
      weight: [65, [CustomValidators.minWeight(45)]],
      lastDonationDate: [''],
      medicalConditions: [''],
      organizationName: [''],
      licenseNumber: [''],
      termsAccepted: [true, [Validators.requiredTrue]]
    });
  }

  get f() { return this.registerForm.controls; }

  setRole(role: 'DONOR' | 'REQUESTER' | 'HOSPITAL'): void {
    this.selectedRole = role;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const payload = {
      ...this.registerForm.value,
      role: this.selectedRole
    };
    delete payload.confirmPassword;
    delete payload.termsAccepted;

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastService.success(`Registration successful! Welcome, ${res.fullName}.`);
        switch (res.role) {
          case 'HOSPITAL': this.router.navigate(['/dashboard/hospital']); break;
          case 'REQUESTER': this.router.navigate(['/dashboard/requester']); break;
          default: this.router.navigate(['/dashboard/donor']); break;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please check your fields and try again.';
      }
    });
  }
}
