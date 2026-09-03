import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BloodRequestService } from '../../core/services/blood-request.service';
import { ToastService } from '../../core/services/toast.service';
import { CustomValidators } from '../../core/validators/custom.validators';
import { BloodRequest } from '../../core/models/models';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <!-- Emergency Header Alert -->
      <div class="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-between shadow-lg shadow-red-600/30 mb-8">
        <div class="flex items-center gap-3">
          <span class="text-2xl animate-pulse">🚨</span>
          <div>
            <h1 class="font-bold text-base sm:text-lg">Emergency Blood Broadcast System</h1>
            <p class="text-xs text-red-100">Automatically broadcasts requests to compatible nearby donors in seconds</p>
          </div>
        </div>
        <div class="hidden sm:block text-right text-xs">
          <span class="font-bold block">Avg Response</span>
          <span class="text-red-200">4.2 Minutes</span>
        </div>
      </div>

      <div class="p-8 sm:p-10 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-glass dark:shadow-glass-dark space-y-6">
        <div class="border-b border-gray-100 dark:border-gray-800 pb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white font-display">Blood Requisition Details</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Please provide accurate hospital and patient details</p>
        </div>

        <!-- Global Validation Error Banner when user submits invalid form -->
        <div *ngIf="showValidationSummary && emergencyForm.invalid"
             class="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border-2 border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold flex items-start gap-3 animate-fade-in">
          <span class="text-lg">⚠️</span>
          <div>
            <span class="font-bold block">Kuch fields me galat ya adhuri jaankari hai!</span>
            <span>Kripya neeche laal rang (red border) me highlighted sabhi fields ko theek karein taaki request sahi se broadcast ho sake.</span>
          </div>
        </div>

        <div *ngIf="errorMessage" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 font-medium">
          {{ errorMessage }}
        </div>

        <form [formGroup]="emergencyForm" (ngSubmit)="onSubmit()" class="space-y-6" novalidate>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Patient Name -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Patient Full Name *</span>
                <span *ngIf="isInvalid('patientName')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
              </label>
              <input type="text" formControlName="patientName" placeholder="e.g. Rajesh Sharma"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                     [ngClass]="getInputClass('patientName')">
              <div *ngIf="isInvalid('patientName')" class="text-[11px] text-red-600 dark:text-red-400 font-medium space-y-0.5">
                <p *ngIf="f['patientName'].errors?.['required']">❌ Mareez (Patient) ka poora naam likhna zaroori hai.</p>
                <p *ngIf="f['patientName'].errors?.['minlength']">❌ Naam kam se kam 2 akshar (characters) ka hona chahiye.</p>
              </div>
            </div>

            <!-- Blood Group Needed -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Blood Group Required *</span>
                <span *ngIf="isInvalid('bloodGroup')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
              </label>
              <select formControlName="bloodGroup"
                      class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                      [ngClass]="getInputClass('bloodGroup')">
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
              <div *ngIf="isInvalid('bloodGroup')" class="text-[11px] text-red-600 dark:text-red-400 font-medium">
                <p>❌ Kripya zaroori blood group chuniye.</p>
              </div>
            </div>

            <!-- Units Needed -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Units Required (1 - 20) *</span>
                <span *ngIf="isInvalid('unitsNeeded')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
              </label>
              <input type="number" formControlName="unitsNeeded" min="1" max="20" placeholder="e.g. 2"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                     [ngClass]="getInputClass('unitsNeeded')">
              <div *ngIf="isInvalid('unitsNeeded')" class="text-[11px] text-red-600 dark:text-red-400 font-medium space-y-0.5">
                <p *ngIf="f['unitsNeeded'].errors?.['required']">❌ Blood units ki sankhya bharna zaroori hai.</p>
                <p *ngIf="f['unitsNeeded'].errors?.['min']">❌ Kam se kam 1 unit blood request karni hogi.</p>
                <p *ngIf="f['unitsNeeded'].errors?.['max']">❌ Ek baar me 20 units se zyada request nahi kar sakte.</p>
              </div>
            </div>

            <!-- Urgency Level -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Priority Level *</span>
                <span *ngIf="isInvalid('urgencyLevel')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
              </label>
              <select formControlName="urgencyLevel"
                      class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                      [ngClass]="getInputClass('urgencyLevel')">
                <option value="CRITICAL">🚨 CRITICAL (Immediate / Under 4 hours)</option>
                <option value="URGENT">⚡ URGENT (Surgery scheduled / Within 24h)</option>
                <option value="NORMAL">🟢 NORMAL (Within 48 hours)</option>
              </select>
              <div *ngIf="isInvalid('urgencyLevel')" class="text-[11px] text-red-600 dark:text-red-400 font-medium">
                <p>❌ Urgency priority level chunna zaroori hai.</p>
              </div>
            </div>

            <!-- Hospital Name -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Hospital / Facility Name *</span>
                <span *ngIf="isInvalid('hospitalName')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
              </label>
              <input type="text" formControlName="hospitalName" placeholder="e.g. Apollo Hospital"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                     [ngClass]="getInputClass('hospitalName')">
              <div *ngIf="isInvalid('hospitalName')" class="text-[11px] text-red-600 dark:text-red-400 font-medium">
                <p>❌ Hospital ka naam likhna zaroori hai.</p>
              </div>
            </div>

            <!-- Required By Date -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Required By Date & Time *</span>
                <span *ngIf="isInvalid('requiredByDate')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
              </label>
              <input type="datetime-local" formControlName="requiredByDate"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                     [ngClass]="getInputClass('requiredByDate')">
              <div *ngIf="isInvalid('requiredByDate')" class="text-[11px] text-red-600 dark:text-red-400 font-medium space-y-0.5">
                <p *ngIf="f['requiredByDate'].errors?.['required']">❌ Required date aur time bharna anivarya hai.</p>
                <p *ngIf="f['requiredByDate'].errors?.['dateInPast']">❌ Required date beete hue samay (past date) ki nahi ho sakti.</p>
              </div>
            </div>
          </div>

          <!-- Hospital Address & Location -->
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Hospital Full Address *</span>
                <span *ngIf="isInvalid('hospitalAddress')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
              </label>
              <input type="text" formControlName="hospitalAddress" placeholder="e.g. Sarita Vihar, Mathura Road"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                     [ngClass]="getInputClass('hospitalAddress')">
              <div *ngIf="isInvalid('hospitalAddress')" class="text-[11px] text-red-600 dark:text-red-400 font-medium">
                <p>❌ Hospital ka poora pata likhein taaki donor wahan pahunch sake.</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- City -->
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                  <span>City *</span>
                  <span *ngIf="isInvalid('city')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
                </label>
                <input type="text" formControlName="city" placeholder="e.g. New Delhi / Noida"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                       [ngClass]="getInputClass('city')">
                <div *ngIf="isInvalid('city')" class="text-[11px] text-red-600 dark:text-red-400 font-medium">
                  <p>❌ City (shehar) ka naam bharna zaroori hai.</p>
                </div>
              </div>

              <!-- Pincode -->
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                  <span>Pincode (6 digits) *</span>
                  <span *ngIf="isInvalid('pincode')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
                </label>
                <input type="text" formControlName="pincode" placeholder="e.g. 110076" maxlength="6"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                       [ngClass]="getInputClass('pincode')">
                <div *ngIf="isInvalid('pincode')" class="text-[11px] text-red-600 dark:text-red-400 font-medium space-y-0.5">
                  <p *ngIf="f['pincode'].errors?.['required']">❌ 6-digit Pincode bharna zaroori hai.</p>
                  <p *ngIf="f['pincode'].errors?.['invalidPincode']">❌ Pincode theek 6 ankon (digits) ka hona chahiye (e.g. 110076).</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact & Reason -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Contact Number -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Emergency Contact Number (10 digits) *</span>
                <span *ngIf="isInvalid('contactNumber')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
              </label>
              <input type="tel" formControlName="contactNumber" placeholder="98XXXXXXXX" maxlength="10"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                     [ngClass]="getInputClass('contactNumber')">
              <div *ngIf="isInvalid('contactNumber')" class="text-[11px] text-red-600 dark:text-red-400 font-medium space-y-0.5">
                <p *ngIf="f['contactNumber'].errors?.['required']">❌ Contact phone number bharna anivarya hai.</p>
                <p *ngIf="f['contactNumber'].errors?.['invalidPhone']">❌ Kripya sahi 10-digit mobile number dalein (starting with 6, 7, 8, ya 9).</p>
              </div>
            </div>

            <!-- Reason -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                <span>Medical Reason / Surgery Type *</span>
                <span *ngIf="isInvalid('reason')" class="text-[11px] text-red-600 font-bold">⚠️ Galt Field</span>
              </label>
              <input type="text" formControlName="reason" placeholder="e.g. Emergency Cardiac Surgery"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 transition-all text-gray-900 dark:text-white"
                     [ngClass]="getInputClass('reason')">
              <div *ngIf="isInvalid('reason')" class="text-[11px] text-red-600 dark:text-red-400 font-medium">
                <p>❌ Blood requirement ka karan/bimari likhna zaroori hai.</p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Additional Instructions (Optional)</label>
            <textarea formControlName="description" rows="2" placeholder="e.g. Contact hospital counter 3 or call attendant directly"
                      class="w-full px-3.5 py-2 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-red-500"></textarea>
          </div>

          <!-- Submit Button (Clickable to trigger full validation if errors exist) -->
          <button type="submit" [disabled]="isLoading"
                  class="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-base shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer">
            <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>{{ isLoading ? 'Broadcasting to donors...' : 'Broadcast Emergency Blood Request' }}</span>
          </button>
        </form>
      </div>
    </div>
  `
})
export class EmergencyComponent {
  emergencyForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showValidationSummary = false;

  constructor(
    private fb: FormBuilder,
    private bloodRequestService: BloodRequestService,
    private toastService: ToastService,
    private router: Router
  ) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.emergencyForm = this.fb.group({
      patientName: ['', [Validators.required, Validators.minLength(2)]],
      bloodGroup: ['B_POSITIVE', [Validators.required]],
      unitsNeeded: [2, [Validators.required, Validators.min(1), Validators.max(20)]],
      urgencyLevel: ['CRITICAL', [Validators.required]],
      hospitalName: ['', [Validators.required]],
      hospitalAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required, CustomValidators.pincode()]],
      requiredByDate: [tomorrow.toISOString().slice(0, 16), [Validators.required, CustomValidators.futureDate()]],
      contactNumber: ['', [Validators.required, CustomValidators.phone()]],
      reason: ['', [Validators.required]],
      description: ['']
    });
  }

  get f() { return this.emergencyForm.controls; }

  isInvalid(fieldName: string): boolean {
    const control = this.emergencyForm.get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty || this.showValidationSummary));
  }

  getInputClass(fieldName: string): string {
    if (this.isInvalid(fieldName)) {
      return 'border-red-500 ring-2 ring-red-400/30 focus:border-red-600 focus:ring-red-500 bg-red-50/20';
    }
    return 'border-gray-300 dark:border-gray-700 focus:outline-hidden focus:ring-2 focus:ring-red-500';
  }

  onSubmit(): void {
    if (this.emergencyForm.invalid) {
      this.showValidationSummary = true;
      this.emergencyForm.markAllAsTouched();
      this.toastService.error('Form me galat ya adhoori jaankari hai. Kripya highlighted fields ko theek karein.', 'Validation Error');

      // Scroll smoothly to top of form or first invalid element
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    this.showValidationSummary = false;
    this.isLoading = true;
    this.errorMessage = '';

    this.bloodRequestService.createRequest(this.emergencyForm.value).subscribe({
      next: (res: BloodRequest) => {
        this.isLoading = false;
        this.toastService.success(`Emergency request broadcasted! ${res.donorsNotified} nearby compatible donors notified.`);
        this.router.navigate(['/requests']);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to submit emergency request. Please try again.';
        this.toastService.error(this.errorMessage);
      }
    });
  }
}
