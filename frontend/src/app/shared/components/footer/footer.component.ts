import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-white dark:bg-[#070A11] border-t border-gray-200 dark:border-gray-800/80 pt-16 pb-12 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Medical Disclaimer Banner -->
        <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 mb-12 flex items-start gap-3">
          <span class="text-xl">⚠️</span>
          <div class="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <span class="font-bold">Medical Disclaimer:</span> Drop4Life is a donor-recipient matching technology platform and is <strong>not</strong> a hospital, blood bank, or healthcare provider. Final donor eligibility and cross-matching is strictly conducted by qualified medical professionals at certified blood banks. In case of life-threatening emergencies, immediately contact emergency response at <strong>112</strong> (India).
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-gray-100 dark:border-gray-800">
          <!-- Brand Column -->
          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center text-white shadow-md">
                <span class="text-lg">🩸</span>
              </div>
              <span class="font-display font-bold text-xl text-gray-900 dark:text-white">
                Drop<span class="text-red-600">4</span>Life
              </span>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              India's real-time emergency blood connection platform. Powered by smart donor matching, geo-proximity verification, and instant notifications to save critical lives.
            </p>
            <div class="flex items-center gap-3 text-xs text-gray-400">
              <span class="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span> 99.9% System Uptime
              </span>
              <span>•</span>
              <span>ISO 27001 Certified</span>
            </div>
          </div>

          <!-- Links 1: Platform -->
          <div>
            <h4 class="font-display font-semibold text-sm text-gray-900 dark:text-white mb-4">Platform</h4>
            <ul class="space-y-2.5 text-xs text-gray-500 dark:text-gray-400">
              <li><a routerLink="/emergency" class="hover:text-red-600">Emergency Alert</a></li>
              <li><a routerLink="/requests" class="hover:text-red-600">Active Blood Requests</a></li>
              <li><a routerLink="/donors" class="hover:text-red-600">Find Compatible Donors</a></li>
              <li><a routerLink="/hospitals" class="hover:text-red-600">Partner Blood Banks</a></li>
            </ul>
          </div>

          <!-- Links 2: Donors -->
          <div>
            <h4 class="font-display font-semibold text-sm text-gray-900 dark:text-white mb-4">Donors</h4>
            <ul class="space-y-2.5 text-xs text-gray-500 dark:text-gray-400">
              <li><a routerLink="/register" class="hover:text-red-600">Register as Donor</a></li>
              <li><a routerLink="/faq" class="hover:text-red-600">Eligibility Guidelines</a></li>
              <li><a routerLink="/faq" class="hover:text-red-600">Donation Intervals</a></li>
              <li><a routerLink="/faq" class="hover:text-red-600">Compatibility Matrix</a></li>
            </ul>
          </div>

          <!-- Links 3: Emergency Helpline -->
          <div>
            <h4 class="font-display font-semibold text-sm text-gray-900 dark:text-white mb-4">Emergency Hotline</h4>
            <div class="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40">
              <span class="text-xs text-red-600 font-bold block">NATIONAL EMERGENCY</span>
              <span class="text-lg font-bold text-gray-900 dark:text-white">112 / 108</span>
              <p class="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Free 24/7 emergency medical assistance in India</p>
            </div>
          </div>
        </div>

        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 Drop4Life Healthcare Network. All rights reserved.</p>
          <div class="flex items-center gap-6">
            <a href="#" class="hover:underline">Privacy Policy</a>
            <a href="#" class="hover:underline">Terms of Service</a>
            <a href="#" class="hover:underline">Data Protection Consent</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
