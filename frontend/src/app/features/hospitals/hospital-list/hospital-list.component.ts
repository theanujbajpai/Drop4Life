import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HospitalService } from '../../../core/services/feature.services';
import { Hospital } from '../../../core/models/models';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-hospital-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EmptyStateComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">
          Certified Hospital Blood Banks
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Partner healthcare institutions with live blood inventory availability
        </p>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 flex gap-3 max-w-md">
        <input type="text" [(ngModel)]="cityFilter" (keyup.enter)="loadHospitals()" placeholder="Filter by city (e.g. Bangalore, Mumbai)"
               class="flex-1 px-3 py-2 rounded-xl text-xs sm:text-sm border bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
        <button (click)="loadHospitals()"
                class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm">
          Search
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let h of hospitals"
             class="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs hover:border-blue-400 transition-all space-y-4">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Verified Blood Bank
              </span>
              <span class="text-xs text-gray-400">Lic: {{ h.licenseNumber }}</span>
            </div>
            <h3 class="font-bold text-lg text-gray-900 dark:text-white mt-2">{{ h.name }}</h3>
            <p class="text-xs text-gray-500">📍 {{ h.address }}, {{ h.city }}</p>
            <p class="text-xs text-blue-600 font-medium mt-1">📞 {{ h.phone }} • Helpline: {{ h.emergencyContact }}</p>
          </div>

          <!-- Live Inventory Breakdown -->
          <div class="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Live Stock Available:</span>
            <div class="grid grid-cols-4 gap-2">
              <div *ngFor="let item of h.inventory"
                   class="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center border border-gray-100 dark:border-gray-800">
                <span class="text-[11px] font-bold text-red-600 block">{{ item.bloodGroup }}</span>
                <span class="text-xs font-extrabold text-gray-900 dark:text-white">{{ item.unitsAvailable }} u</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HospitalListComponent implements OnInit {
  hospitals: Hospital[] = [];
  cityFilter = '';

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals(): void {
    this.hospitalService.getHospitals(this.cityFilter || undefined).subscribe({
      next: (data) => this.hospitals = data,
      error: () => {}
    });
  }
}
