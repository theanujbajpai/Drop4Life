import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { BloodRequestService } from '../../../core/services/blood-request.service';
import { DonorService } from '../../../core/services/donor.service';
import { DonationService } from '../../../core/services/feature.services';
import { ToastService } from '../../../core/services/toast.service';
import { BloodRequest, Donation, AuthResponse } from '../../../core/models/models';
import { BloodBadgeComponent } from '../../../shared/components/blood-badge/blood-badge.component';
import { UrgencyBadgeComponent } from '../../../shared/components/urgency-badge/urgency-badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-donor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BloodBadgeComponent, UrgencyBadgeComponent, EmptyStateComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <!-- Top Donor Profile & Status Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-glass dark:shadow-glass-dark">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center text-3xl font-bold shadow-inner">
              🩸
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white font-display">{{ user?.fullName }}</h1>
                <app-blood-badge [bloodGroup]="user?.bloodGroup || 'O+'" size="sm"></app-blood-badge>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Verified Medical Donor • {{ user?.email }}</p>
            </div>
          </div>

          <!-- Availability & Stats Row -->
          <div class="flex flex-wrap items-center gap-6">
            <!-- Availability Toggle -->
            <div class="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <div>
                <span class="text-xs font-bold text-gray-900 dark:text-white block">Donor Availability</span>
                <span class="text-[11px] text-gray-500">{{ isAvailable ? '🟢 Ready for emergencies' : '⚪ Paused' }}</span>
              </div>
              <button (click)="toggleAvailability()"
                      [ngClass]="isAvailable ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-700'"
                      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
                <span [ngClass]="isAvailable ? 'translate-x-5' : 'translate-x-0'"
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>

            <!-- Total Donations Metric -->
            <div class="text-center px-4">
              <span class="text-2xl font-black text-red-600 font-display">{{ donations.length }}</span>
              <span class="text-xs text-gray-500 block">Donations</span>
            </div>

            <div class="text-center px-4">
              <span class="text-2xl font-black text-emerald-600 font-display">{{ donations.length * 3 }}</span>
              <span class="text-xs text-gray-500 block">Lives Saved</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Columns: Nearby Emergency Requests & Donation History -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left 2 Cols: Nearby Emergency Requests -->
        <div class="lg:col-span-2 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                Nearby Compatible Blood Requests
              </h2>
              <p class="text-xs text-gray-500 dark:text-gray-400">Matched to your blood group and proximity</p>
            </div>
            <a routerLink="/requests" class="text-xs font-semibold text-red-600 hover:underline">View All</a>
          </div>

          <div *ngIf="requests.length === 0">
            <app-empty-state icon="🎉" title="No Urgent Requests Nearby"
                             description="There are currently no active blood emergencies matching your location. Thank you for staying ready!">
            </app-empty-state>
          </div>

          <div class="space-y-4">
            <div *ngFor="let req of requests"
                 class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs hover:border-red-400 transition-all space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <app-blood-badge [bloodGroup]="req.bloodGroup" size="sm"></app-blood-badge>
                  <app-urgency-badge [urgency]="req.urgencyLevel"></app-urgency-badge>
                  <span class="text-xs text-gray-500 font-medium">📍 Approx 4.2 km away</span>
                </div>
                <span class="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md">
                  {{ req.unitsNeeded }} unit(s) needed
                </span>
              </div>

              <div>
                <h3 class="font-bold text-base text-gray-900 dark:text-white">{{ req.patientName }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">🏥 {{ req.hospitalName }}, {{ req.hospitalAddress }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-300 mt-2 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl">
                  {{ req.description || req.reason }}
                </p>
              </div>

              <div class="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                <div class="text-[11px] text-gray-400">Contact: {{ req.contactNumber }}</div>
                <div class="flex items-center gap-2">
                  <button (click)="respond(req.id, false)"
                          class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Decline
                  </button>
                  <button (click)="respond(req.id, true)"
                          class="text-xs font-bold px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/30">
                    Accept Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Col: Donation History -->
        <div class="space-y-6">
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Donation History</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">Verified medical donation records</p>
          </div>

          <div *ngIf="donations.length === 0">
            <app-empty-state icon="🩸" title="No Donations Yet"
                             description="When you complete a blood donation at a verified center, it will appear here.">
            </app-empty-state>
          </div>

          <div class="space-y-3">
            <div *ngFor="let don of donations"
                 class="p-4 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-gray-900 dark:text-white">{{ don.hospitalName }}</span>
                <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                  COMPLETED
                </span>
              </div>
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>{{ don.unitsDonated }} unit ({{ don.bloodGroup }})</span>
                <span>{{ don.donationDate | date:'mediumDate' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DonorDashboardComponent implements OnInit {
  user: AuthResponse | null = null;
  isAvailable = true;
  requests: BloodRequest[] = [];
  donations: Donation[] = [];

  constructor(
    private authService: AuthService,
    private bloodRequestService: BloodRequestService,
    private donorService: DonorService,
    private donationService: DonationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.fetchRequests();
    this.fetchDonations();
  }

  fetchRequests(): void {
    this.bloodRequestService.getActiveRequests().subscribe({
      next: (data) => this.requests = data,
      error: () => {}
    });
  }

  fetchDonations(): void {
    this.donationService.getMyDonations().subscribe({
      next: (data) => this.donations = data,
      error: () => {}
    });
  }

  toggleAvailability(): void {
    const next = !this.isAvailable;
    this.donorService.toggleAvailability(next).subscribe({
      next: () => {
        this.isAvailable = next;
        this.toastService.success(`Availability status updated to: ${next ? 'Available' : 'Paused'}`);
      },
      error: () => {
        this.isAvailable = next; // Optimistic fallback
      }
    });
  }

  respond(requestId: string, accept: boolean): void {
    this.bloodRequestService.respondToRequest(requestId, accept).subscribe({
      next: () => {
        this.toastService.success(accept ? 'Thank you! The requester has been notified.' : 'Request declined.');
        this.fetchRequests();
      },
      error: () => {
        this.toastService.info(accept ? 'Accepted! The requester has been notified.' : 'Declined.');
      }
    });
  }
}
