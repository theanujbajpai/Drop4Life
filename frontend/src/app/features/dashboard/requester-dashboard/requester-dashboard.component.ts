import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BloodRequestService } from '../../../core/services/blood-request.service';
import { AuthService } from '../../../core/services/auth.service';
import { BloodRequest } from '../../../core/models/models';
import { BloodBadgeComponent } from '../../../shared/components/blood-badge/blood-badge.component';
import { UrgencyBadgeComponent } from '../../../shared/components/urgency-badge/urgency-badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-requester-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BloodBadgeComponent, UrgencyBadgeComponent, EmptyStateComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">
            Recipient / Patient Dashboard
          </h1>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Track blood requests, donor notifications, and real-time responses
          </p>
        </div>

        <a routerLink="/emergency"
           class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/30 flex items-center justify-center gap-2">
          <span>➕</span> Post New Blood Request
        </a>
      </div>

      <div *ngIf="myRequests.length === 0">
        <app-empty-state icon="🩸" title="No Blood Requests Created Yet"
                         description="If you or a patient in your care urgently requires blood units, create a request to instantly notify compatible donors.">
          <a routerLink="/emergency" class="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold mt-2 inline-block">
            Create Request
          </a>
        </app-empty-state>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div *ngFor="let req of myRequests"
             class="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-glass dark:shadow-glass-dark space-y-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <app-blood-badge [bloodGroup]="req.bloodGroup"></app-blood-badge>
              <app-urgency-badge [urgency]="req.urgencyLevel"></app-urgency-badge>
            </div>
            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              STATUS: {{ req.status }}
            </span>
          </div>

          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ req.patientName }}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">🏥 {{ req.hospitalName }}, {{ req.city }}</p>
            <p class="text-xs text-gray-600 dark:text-gray-300 mt-2 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl">
              {{ req.description || req.reason }}
            </p>
          </div>

          <!-- Live Progress Tracker -->
          <div class="space-y-2 p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <div class="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
              <span>Units Secured</span>
              <span class="text-red-600">{{ req.unitsSecured }} / {{ req.unitsNeeded }} Units</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full transition-all"
                   [style.width.%]="(req.unitsSecured / req.unitsNeeded) * 100"></div>
            </div>

            <div class="grid grid-cols-2 gap-2 pt-2 text-[11px] text-gray-500 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-700/50">
              <div>🔔 Donors Notified: <strong>{{ req.donorsNotified }}</strong></div>
              <div>🤝 Donors Responded: <strong>{{ req.donorsResponded }}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RequesterDashboardComponent implements OnInit {
  myRequests: BloodRequest[] = [];

  constructor(
    private bloodRequestService: BloodRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bloodRequestService.getMyRequests().subscribe({
      next: (data) => this.myRequests = data,
      error: () => {}
    });
  }
}
