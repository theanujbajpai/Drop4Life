import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonorService } from '../../../core/services/donor.service';
import { BloodGroup, DonorMatch } from '../../../core/models/models';
import { BloodBadgeComponent } from '../../../shared/components/blood-badge/blood-badge.component';
import { InteractiveMapComponent, MapMarker } from '../../../shared/components/map/map.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-find-donors',
  standalone: true,
  imports: [CommonModule, FormsModule, BloodBadgeComponent, InteractiveMapComponent, EmptyStateComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-display">
          AI-Powered Smart Donor Matching
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Find verified compatible donors based on biological compatibility, proximity tiers, and cooldown readiness
        </p>
      </div>

      <!-- Search & Filters Header -->
      <div class="p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-glass dark:shadow-glass-dark">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <!-- Blood Group -->
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Needed Blood Group</label>
            <select [(ngModel)]="selectedBloodGroup" (change)="searchDonors()"
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

          <!-- City Filter -->
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">City</label>
            <input type="text" [(ngModel)]="cityFilter" (keyup.enter)="searchDonors()" placeholder="e.g. Delhi / Noida"
                   class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
          </div>

          <!-- Search Radius -->
          <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-700 dark:text-gray-300">Search Radius (km)</label>
            <select [(ngModel)]="radius" (change)="searchDonors()"
                    class="w-full px-3.5 py-2.5 rounded-xl text-sm border bg-gray-50/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              <option [value]="10">10 km (Tier 1)</option>
              <option [value]="25">25 km (Tier 2)</option>
              <option [value]="50">50 km (Tier 3)</option>
              <option [value]="100">100 km (Expanded)</option>
            </select>
          </div>

          <!-- Action -->
          <div class="flex items-end">
            <button (click)="searchDonors()"
                    class="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/30">
              Find Matching Donors
            </button>
          </div>
        </div>
      </div>

      <!-- Map View -->
      <app-interactive-map [markers]="mapMarkers" [centerLat]="28.6139" [centerLng]="77.2090" [zoom]="10">
      </app-interactive-map>

      <!-- Matched Donors Result List -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            Matched Donors ({{ donors.length }})
          </h3>
          <span class="text-xs text-gray-500">Sorted by Smart Match Score</span>
        </div>

        <div *ngIf="donors.length === 0">
          <app-empty-state icon="🔍" title="No matching donors found in this radius"
                           description="Try expanding the search radius or choosing all cities.">
          </app-empty-state>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div *ngFor="let donor of donors"
               class="p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xs hover:border-red-400 transition-all space-y-3">
            <div class="flex items-center justify-between">
              <app-blood-badge [bloodGroup]="donor.bloodGroup"></app-blood-badge>
              <!-- Match Score Badge -->
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                <span>⭐</span> {{ donor.matchScore | number:'1.0-0' }}% Match
              </div>
            </div>

            <div>
              <h4 class="font-bold text-base text-gray-900 dark:text-white">{{ donor.fullName }}</h4>
              <p class="text-xs text-gray-500">📍 {{ donor.city }} • Approx {{ donor.distanceKm }} km away</p>
              <div class="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                <span>Tier {{ donor.distanceTier }} Proximity</span>
                <span>•</span>
                <span>Last Donated: {{ donor.lastDonationDate ? (donor.lastDonationDate | date:'mediumDate') : 'Never' }}</span>
              </div>
            </div>

            <div class="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span class="text-xs font-semibold text-emerald-600">🟢 Available Now</span>
              <a href="tel:9876543210" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700">
                Contact Donor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FindDonorsComponent implements OnInit {
  selectedBloodGroup: BloodGroup = 'B_POSITIVE';
  cityFilter = '';
  radius = 50;
  donors: DonorMatch[] = [];
  mapMarkers: MapMarker[] = [];

  constructor(private donorService: DonorService) {}

  ngOnInit(): void {
    this.searchDonors();
  }

  searchDonors(): void {
    this.donorService.matchDonors(
      this.selectedBloodGroup,
      28.6139,
      77.2090,
      this.cityFilter || undefined,
      this.radius
    ).subscribe({
      next: (data) => {
        this.donors = data;
        this.mapMarkers = data.map((d, index) => ({
          id: d.id,
          lat: 28.55 + (index * 0.04), // Plotted nearby coordinates for demo
          lng: 77.22 + (index * 0.03),
          title: d.fullName,
          subtitle: `${d.city} (${d.distanceKm} km away)`,
          badge: d.bloodGroup,
          type: 'donor'
        }));
      },
      error: () => {}
    });
  }
}
