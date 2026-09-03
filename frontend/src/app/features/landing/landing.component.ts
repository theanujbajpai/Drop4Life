import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BloodRequestService } from '../../core/services/blood-request.service';
import { BloodRequest } from '../../core/models/models';
import { BloodBadgeComponent } from '../../shared/components/blood-badge/blood-badge.component';
import { UrgencyBadgeComponent } from '../../shared/components/urgency-badge/urgency-badge.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, BloodBadgeComponent, UrgencyBadgeComponent],
  template: `
    <div class="space-y-24 pb-20">
      <!-- HERO SECTION -->
      <section class="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <!-- Background Gradient Blobs -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 dark:bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div class="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center max-w-3xl mx-auto space-y-6">
            <!-- Medical Badges -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-xs font-semibold text-red-700 dark:text-red-300 shadow-xs">
              <span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span>Next-Gen Healthcare Network</span>
              <span class="text-gray-400 dark:text-gray-600">•</span>
              <span>Smart Donor Matching</span>
            </div>

            <h1 class="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
              Every Single Drop <br/>
              <span class="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
                Has The Power To Save A Life
              </span>
            </h1>

            <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Drop4Life bridges the critical gap between emergency patients, compatible nearby blood donors, and verified hospital blood banks across India with real-time location matching.
            </p>

            <!-- Call to Actions -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a routerLink="/emergency"
                 class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-base shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2">
                <span>🚨</span> Request Emergency Blood
              </a>

              <a routerLink="/register"
                 class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 hover:border-red-500 text-gray-900 dark:text-white font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                <span>❤️</span> Register as Donor
              </a>
            </div>

            <!-- Trust Badges -->
            <div class="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <span class="flex items-center gap-1.5">✓ 100% Free & Non-Profit</span>
              <span class="flex items-center gap-1.5">✓ Verified Blood Banks</span>
              <span class="flex items-center gap-1.5">✓ Auto-Expanding Search</span>
              <span class="flex items-center gap-1.5">✓ Real-time SMS & Alerts</span>
            </div>
          </div>
        </div>
      </section>

      <!-- LIVE STATS COUNTER BAR -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-200/80 dark:border-gray-800 shadow-glass dark:shadow-glass-dark">
          <div class="text-center p-3">
            <span class="block text-3xl sm:text-4xl font-extrabold text-red-600 font-display">12,450+</span>
            <span class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 block">Registered Donors</span>
          </div>
          <div class="text-center p-3">
            <span class="block text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white font-display">8,920+</span>
            <span class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 block">Successful Donations</span>
          </div>
          <div class="text-center p-3">
            <span class="block text-3xl sm:text-4xl font-extrabold text-emerald-600 font-display">4.2 min</span>
            <span class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 block">Avg Response Time</span>
          </div>
          <div class="text-center p-3">
            <span class="block text-3xl sm:text-4xl font-extrabold text-blue-600 font-display">350+</span>
            <span class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 block">Partner Hospitals</span>
          </div>
        </div>
      </section>

      <!-- LIVE ACTIVE EMERGENCY REQUESTS PREVIEW -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
              <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span> Real-Time Urgent Requests
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
              Active Blood Emergencies
            </h2>
          </div>
          <a routerLink="/requests" class="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">
            View All Active Requests &rarr;
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let req of activeRequests"
               class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 hover:border-red-400 dark:hover:border-red-600 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <app-blood-badge [bloodGroup]="req.bloodGroup" size="md"></app-blood-badge>
                <app-urgency-badge [urgency]="req.urgencyLevel"></app-urgency-badge>
              </div>

              <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-1">
                {{ req.patientName }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-3">
                <span>🏥</span> {{ req.hospitalName }}, {{ req.city }}
              </p>

              <p class="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 bg-gray-50 dark:bg-gray-800/40 p-2.5 rounded-xl">
                {{ req.description || req.reason }}
              </p>
            </div>

            <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div class="text-xs text-gray-500">
                <span class="font-bold text-gray-900 dark:text-white">{{ req.unitsNeeded }} unit(s)</span> needed
              </div>
              <a [routerLink]="['/emergency']" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white">
                Respond Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-wider text-red-600">Simple 4-Step Process</span>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">How Drop4Life Works</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Saving lives in minutes through automated smart matching and instant response tracking.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 text-center space-y-3">
            <div class="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 flex items-center justify-center text-2xl mx-auto">
              1️⃣
            </div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white">Submit Request</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Patients, family, or hospital staff post blood requirements with hospital location and urgency.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 text-center space-y-3">
            <div class="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center text-2xl mx-auto">
              2️⃣
            </div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white">Smart Match</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Our algorithm checks blood compatibility, eligibility, cooldown days, and proximity (0-50 km).
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 text-center space-y-3">
            <div class="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center text-2xl mx-auto">
              3️⃣
            </div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white">Instant Alerts</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Top-scoring compatible donors receive real-time notifications with distance and 1-tap accept.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 text-center space-y-3">
            <div class="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center text-2xl mx-auto">
              4️⃣
            </div>
            <h3 class="font-bold text-base text-gray-900 dark:text-white">Life Saved</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Donor donates at the verified hospital blood bank, and records are safely logged in the system.
            </p>
          </div>
        </div>
      </section>

      <!-- BLOOD COMPATIBILITY CHART PREVIEW -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
          <div class="max-w-2xl space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-red-400">Quick Science Guide</span>
            <h2 class="text-3xl font-bold">Blood Compatibility Reference</h2>
            <p class="text-sm text-gray-300 leading-relaxed">
              Did you know that <strong>O-Negative</strong> is the universal red cell donor, while <strong>AB-Positive</strong> is the universal plasma and recipient? Drop4Life automatically computes cross-compatibility during every search.
            </p>

            <div class="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span class="text-red-400 font-bold block text-sm">O-</span>
                <span class="text-gray-300">Can give to ALL</span>
              </div>
              <div class="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span class="text-red-400 font-bold block text-sm">O+</span>
                <span class="text-gray-300">Can give to O+, A+, B+, AB+</span>
              </div>
              <div class="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span class="text-red-400 font-bold block text-sm">A+</span>
                <span class="text-gray-300">Can give to A+, AB+</span>
              </div>
              <div class="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                <span class="text-red-400 font-bold block text-sm">AB+</span>
                <span class="text-gray-300">Universal Recipient</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CALL TO ACTION -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="p-12 rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 text-white space-y-6 shadow-xl shadow-red-600/20">
          <h2 class="text-3xl sm:text-4xl font-extrabold font-display">
            Ready to become someone's superhero?
          </h2>
          <p class="text-base text-red-100 max-w-xl mx-auto">
            A single donation can save up to three lives. Register today, set your availability, and be there when it matters most.
          </p>
          <div class="flex justify-center gap-4 pt-2">
            <a routerLink="/register" class="px-8 py-3.5 rounded-xl bg-white text-red-600 font-bold hover:bg-red-50 transition-colors shadow-md">
              Register as Donor
            </a>
          </div>
        </div>
      </section>
    </div>
  `
})
export class LandingComponent implements OnInit {
  activeRequests: BloodRequest[] = [];

  constructor(private bloodRequestService: BloodRequestService) {}

  ngOnInit(): void {
    this.bloodRequestService.getActiveRequests().subscribe({
      next: (requests) => {
        this.activeRequests = requests.slice(0, 3);
      },
      error: () => {
        // Fallback demo requests if backend is starting
        this.activeRequests = [
          {
            id: 'demo-1',
            requesterId: 'req-1',
            requesterName: 'Sunita Gupta',
            patientName: 'Ramesh Kumar',
            bloodGroup: 'B+',
            unitsNeeded: 3,
            urgencyLevel: 'CRITICAL',
            hospitalName: 'Apollo Hospital',
            hospitalAddress: 'Sarita Vihar, Delhi Mathura Road',
            city: 'New Delhi',
            requiredByDate: new Date().toISOString(),
            description: 'Emergency cardiac bypass surgery. Immediate blood required.',
            contactNumber: '9844556677',
            reason: 'Cardiac surgery',
            status: 'ACTIVE',
            donorsNotified: 12,
            donorsResponded: 3,
            unitsSecured: 1,
            createdAt: new Date().toISOString()
          },
          {
            id: 'demo-2',
            requesterId: 'req-2',
            requesterName: 'Manipal Admin',
            patientName: 'Sneha Roy',
            bloodGroup: 'O-',
            unitsNeeded: 2,
            urgencyLevel: 'URGENT',
            hospitalName: 'Manipal Hospital',
            hospitalAddress: 'HAL Old Airport Rd, Kodihalli',
            city: 'Bangalore',
            requiredByDate: new Date().toISOString(),
            description: 'Road trauma unit patient. Universal donor units needed urgently.',
            contactNumber: '9800112233',
            reason: 'Trauma recovery',
            status: 'ACTIVE',
            donorsNotified: 8,
            donorsResponded: 2,
            unitsSecured: 0,
            createdAt: new Date().toISOString()
          }
        ];
      }
    });
  }
}
