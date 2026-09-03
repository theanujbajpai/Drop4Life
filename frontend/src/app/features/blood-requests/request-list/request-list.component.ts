import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BloodRequestService } from '../../../core/services/blood-request.service';
import { BloodRequest, BloodGroup, UrgencyLevel } from '../../../core/models/models';
import { BloodBadgeComponent } from '../../../shared/components/blood-badge/blood-badge.component';
import { UrgencyBadgeComponent } from '../../../shared/components/urgency-badge/urgency-badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BloodBadgeComponent, UrgencyBadgeComponent, EmptyStateComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">
            Active Blood Requisitions
          </h1>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Current patient blood requests requiring donor assistance across India
          </p>
        </div>

        <a routerLink="/emergency"
           class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/30 flex items-center justify-center gap-2">
          <span>🚨</span> Post Emergency Request
        </a>
      </div>

      <!-- Filters -->
      <div class="p-4 sm:p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs flex flex-wrap items-center gap-4">
        <div class="w-full sm:w-48">
          <select [(ngModel)]="bloodGroupFilter" (change)="loadRequests()"
                  class="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
            <option value="">All Blood Groups</option>
            <option value="A_POSITIVE">A+</option>
            <option value="A_NEGATIVE">A-</option>
            <option value="B_POSITIVE">B+</option>
            <option value="B_NEGATIVE">B-</option>
            <option value="AB_POSITIVE">AB+</option>
            <option value="AB_NEGATIVE">AB-</option>
            <option value="O_POSITIVE">O+</option>
            <option value="O_NEGATIVE">O-</option>
          </select>
        </div>

        <div class="w-full sm:w-48">
          <select [(ngModel)]="urgencyFilter" (change)="loadRequests()"
                  class="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
            <option value="">All Urgencies</option>
            <option value="CRITICAL">🚨 CRITICAL</option>
            <option value="URGENT">⚡ URGENT</option>
            <option value="NORMAL">🟢 NORMAL</option>
          </select>
        </div>

        <div class="flex-1 min-w-[200px]">
          <input type="text" [(ngModel)]="cityFilter" (keyup.enter)="loadRequests()" placeholder="Search by city (e.g. Delhi, Mumbai)"
                 class="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
        </div>

        <button (click)="loadRequests()"
                class="px-5 py-2 rounded-xl bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold text-xs sm:text-sm">
          Filter
        </button>
      </div>

      <div *ngIf="requests.length === 0">
        <app-empty-state icon="🩸" title="No Active Blood Requests"
                         description="No active blood requisitions found matching these criteria.">
        </app-empty-state>
      </div>

      <!-- Requests Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let req of requests"
             class="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 hover:border-red-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <app-blood-badge [bloodGroup]="req.bloodGroup"></app-blood-badge>
              <app-urgency-badge [urgency]="req.urgencyLevel"></app-urgency-badge>
            </div>

            <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ req.patientName }}</h3>
            <p class="text-xs text-gray-500">🏥 {{ req.hospitalName }}, {{ req.city }}</p>
            <p class="text-xs text-gray-600 dark:text-gray-300 mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
              {{ req.description || req.reason }}
            </p>
          </div>

          <div class="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div class="text-xs text-gray-500">
              <span class="font-bold text-red-600">{{ req.unitsNeeded }} units</span> needed
            </div>
            <a [routerLink]="['/emergency']" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white">
              Offer Blood
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RequestListComponent implements OnInit {
  requests: BloodRequest[] = [];
  bloodGroupFilter: BloodGroup | '' = '';
  urgencyFilter: UrgencyLevel | '' = '';
  cityFilter = '';

  constructor(private bloodRequestService: BloodRequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.bloodRequestService.getActiveRequests(
      this.bloodGroupFilter || undefined,
      this.urgencyFilter || undefined,
      this.cityFilter || undefined
    ).subscribe({
      next: (data) => this.requests = data,
      error: () => {}
    });
  }
}
