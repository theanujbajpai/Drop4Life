import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../core/services/feature.services';
import { DashboardStats } from '../../../core/models/models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">
          Drop4Life Platform Administration
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          System analytics, security audit logs, and medical network monitoring
        </p>
      </div>

      <!-- Platform Overview Metrics -->
      <div *ngIf="stats" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs text-center">
          <span class="text-2xl font-black text-gray-900 dark:text-white block font-display">{{ stats.totalUsers }}</span>
          <span class="text-xs text-gray-500">Total Users</span>
        </div>
        <div class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs text-center">
          <span class="text-2xl font-black text-red-600 block font-display">{{ stats.totalDonors }}</span>
          <span class="text-xs text-gray-500">Donors Registered</span>
        </div>
        <div class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs text-center">
          <span class="text-2xl font-black text-emerald-600 block font-display">{{ stats.activeDonors }}</span>
          <span class="text-xs text-gray-500">Active / Ready</span>
        </div>
        <div class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs text-center">
          <span class="text-2xl font-black text-amber-600 block font-display">{{ stats.activeBloodRequests }}</span>
          <span class="text-xs text-gray-500">Active Requests</span>
        </div>
        <div class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs text-center">
          <span class="text-2xl font-black text-red-700 block font-display">{{ stats.criticalBloodRequests }}</span>
          <span class="text-xs text-gray-500">Critical Priority</span>
        </div>
        <div class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs text-center">
          <span class="text-2xl font-black text-blue-600 block font-display">{{ stats.completedDonations }}</span>
          <span class="text-xs text-gray-500">Lives Saved</span>
        </div>
      </div>

      <!-- Requests by Blood Group Bar Representation -->
      <div *ngIf="stats" class="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
        <h3 class="text-base font-bold text-gray-900 dark:text-white">Active Requests by Blood Group</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div *ngFor="let bg of bloodGroups"
               class="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-center">
            <span class="text-xs font-bold text-red-600 block">{{ bg }}</span>
            <span class="text-lg font-bold text-gray-900 dark:text-white">
              {{ stats.requestsByBloodGroup[bg] || 0 }}
            </span>
            <span class="text-[10px] text-gray-400 block">reqs</span>
          </div>
        </div>
      </div>

      <!-- Recent Audit Logs Table -->
      <div class="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
        <h3 class="text-base font-bold text-gray-900 dark:text-white">System Audit & Security Trail</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-gray-500 dark:text-gray-400">
            <thead class="text-[11px] uppercase bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300">
              <tr>
                <th class="p-3">Action</th>
                <th class="p-3">Entity</th>
                <th class="p-3">Details</th>
                <th class="p-3">Timestamp</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
              <tr *ngFor="let log of auditLogs" class="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                <td class="p-3 font-semibold text-gray-900 dark:text-white">{{ log.action }}</td>
                <td class="p-3">{{ log.entityType }}</td>
                <td class="p-3">{{ log.details }}</td>
                <td class="p-3">{{ log.timestamp | date:'short' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  auditLogs: any[] = [];
  bloodGroups = ['A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE'];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getAdminStats().subscribe({
      next: (stats) => this.stats = stats,
      error: () => {}
    });

    this.dashboardService.getAuditLogs().subscribe({
      next: (logs) => this.auditLogs = logs,
      error: () => {}
    });
  }
}
