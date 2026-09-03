import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalService } from '../../../core/services/feature.services';
import { BloodRequestService } from '../../../core/services/blood-request.service';
import { Hospital, BloodRequest } from '../../../core/models/models';
import { BloodBadgeComponent } from '../../../shared/components/blood-badge/blood-badge.component';
import { UrgencyBadgeComponent } from '../../../shared/components/urgency-badge/urgency-badge.component';

@Component({
  selector: 'app-hospital-dashboard',
  standalone: true,
  imports: [CommonModule, BloodBadgeComponent, UrgencyBadgeComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">
            Hospital & Blood Bank Portal
          </h1>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Real-time blood stock inventory and emergency requisition management
          </p>
        </div>
      </div>

      <!-- Hospital Inventory Grid -->
      <div *ngIf="hospital" class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-glass dark:shadow-glass-dark space-y-6">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ hospital.name }}</h2>
            <span class="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Verified Blood Bank
            </span>
          </div>
          <p class="text-xs text-gray-500">{{ hospital.address }}, {{ hospital.city }} • License: {{ hospital.licenseNumber }}</p>
        </div>

        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Live Blood Inventory Stocks:</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <div *ngFor="let item of hospital.inventory"
                 class="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-center space-y-1">
              <span class="text-sm font-black text-red-600 block">{{ item.bloodGroup }}</span>
              <span class="text-xl font-extrabold text-gray-900 dark:text-white block">{{ item.unitsAvailable }}</span>
              <span class="text-[10px] text-gray-400 uppercase">Units Avail</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Emergency Requisitions -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">Active Hospital Requisitions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div *ngFor="let req of requests"
               class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
            <div class="flex items-center justify-between">
              <app-blood-badge [bloodGroup]="req.bloodGroup" size="sm"></app-blood-badge>
              <app-urgency-badge [urgency]="req.urgencyLevel"></app-urgency-badge>
            </div>
            <h4 class="font-bold text-sm text-gray-900 dark:text-white">{{ req.patientName }} ({{ req.unitsNeeded }} units)</h4>
            <p class="text-xs text-gray-500">{{ req.description || req.reason }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HospitalDashboardComponent implements OnInit {
  hospital: Hospital | null = null;
  requests: BloodRequest[] = [];

  constructor(
    private hospitalService: HospitalService,
    private bloodRequestService: BloodRequestService
  ) {}

  ngOnInit(): void {
    this.hospitalService.getHospitals().subscribe({
      next: (hospitals) => {
        if (hospitals.length > 0) {
          this.hospital = hospitals[0];
        }
      },
      error: () => {}
    });

    this.bloodRequestService.getActiveRequests().subscribe({
      next: (requests) => this.requests = requests,
      error: () => {}
    });
  }
}
