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

        <form [formGroup]="emergencyForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div *ngIf="errorMessage" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 font-medium">
            {{ errorMessage }}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Patient Name -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Patient Full Name *</label>
              <input type="text" formControlName="patientName" placeholder="Patient Name"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                     [ngClass]="{'border-red-500': f['patientName'].touched && f['patientName'].invalid}">
              <p *ngIf="f['patientName'].touched && f['patientName'].invalid" class="text-[11px] text-red-500">Patient name is required</p>
            </div>

            <!-- Blood Group Needed -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Blood Group Required *</label>
              <select formControlName="bloodGroup"
                      class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
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

            <!-- Units Needed -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Units Required (1 - 20) *</label>
              <input type="number" formControlName="unitsNeeded" min="1" max="20"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
            </div>

            <!-- Urgency Level -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Priority Level *</label>
              <select formControlName="urgencyLevel"
                      class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                <option value="CRITICAL">🚨 CRITICAL (Immediate / Under 4 hours)</option>
                <option value="URGENT">⚡ URGENT (Surgery scheduled / Within 24h)</option>
                <option value="NORMAL">🟢 NORMAL (Within 48 hours)</option>
              </select>
            </div>

            <!-- Hospital Name -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Hospital / Facility Name *</label>
              <input type="text" formControlName="hospitalName" placeholder="e.g. Apollo Hospital"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
            </div>

            <!-- Required By Date -->
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Required By Date & Time *</label>
              <input type="datetime-local" formControlName="requiredByDate"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
            </div>
          </div>

          <!-- Hospital Address & Location -->
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Hospital Address *</label>
              <input type="text" formControlName="hospitalAddress" placeholder="Full street address of hospital"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">City *</label>
                <input type="text" formControlName="city" placeholder="e.g. New Delhi / Bangalore"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Pincode *</label>
                <input type="text" formControlName="pincode" placeholder="6 digits" maxlength="6"
                       class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              </div>
            </div>
          </div>

          <!-- Contact & Reason -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Emergency Contact Number *</label>
              <input type="tel" formControlName="contactNumber" placeholder="98XXXXXXXX" maxlength="10"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                     [ngClass]="{'border-red-500': f['contactNumber'].touched && f['contactNumber'].invalid}">
              <p *ngIf="f['contactNumber'].touched && f['contactNumber'].invalid" class="text-[11px] text-red-500">10-digit number required</p>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Medical Reason / Surgery Type *</label>
              <input type="text" formControlName="reason" placeholder="e.g. Emergency Cardiac Surgery / Accident"
                     class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Additional Instructions (Optional)</label>
            <textarea formControlName="description" rows="2" placeholder="e.g. Please report to 3rd floor Blood Bank, Attendant name: Ramesh"
                      class="w-full px-3.5 py-2 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"></textarea>
          </div>

          <button type="submit" [disabled]="emergencyForm.invalid || isLoading"
                  class="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:opacity-50 text-white font-extrabold text-base shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2">
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
      requiredByDate: [tomorrow.toISOString().slice(0, 16), [Validators.required]],
      contactNumber: ['', [Validators.required, CustomValidators.phone()]],
      reason: ['', [Validators.required]],
      description: ['']
    });
  }

  get f() { return this.emergencyForm.controls; }

  onSubmit(): void {
    if (this.emergencyForm.invalid) return;

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
      }
    });
  }
}
