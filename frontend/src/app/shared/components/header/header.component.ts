import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { NotificationService } from '../../../core/services/feature.services';
import { WebSocketService } from '../../../core/services/websocket.service';
import { AuthResponse } from '../../../core/models/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-[#0B0F19]/85 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <!-- Top Emergency Ticker -->
      <div class="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs py-1.5 px-4 font-medium">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span class="font-bold tracking-wide">LIVE 24/7 EMERGENCY BLOOD NETWORK</span>
            <span class="hidden md:inline text-red-100">| Dial 112 or request instant donor alert</span>
          </div>
          <a routerLink="/emergency" class="underline hover:text-red-100 font-semibold flex items-center gap-1">
            Create Urgent Request &rarr;
          </a>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            <span class="text-xl">🩸</span>
          </div>
          <div>
            <span class="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Drop<span class="text-red-600">4</span>Life
            </span>
            <span class="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold -mt-1">
              Every Drop Saves A Life
            </span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a routerLink="/requests" routerLinkActive="text-red-600 dark:text-red-400" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Blood Requests
          </a>
          <a routerLink="/donors" routerLinkActive="text-red-600 dark:text-red-400" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Find Donors
          </a>
          <a routerLink="/hospitals" routerLinkActive="text-red-600 dark:text-red-400" class="hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Hospitals
          </a>
          <a routerLink="/emergency" class="text-red-600 dark:text-red-400 font-semibold flex items-center gap-1 hover:underline">
            <span class="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            Emergency
          </a>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-3">
          <!-- Dark Mode Toggle -->
          <button (click)="themeService.toggleTheme()"
                  class="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle Theme">
            <span *ngIf="themeService.isDarkMode$ | async">☀️</span>
            <span *ngIf="!(themeService.isDarkMode$ | async)">🌙</span>
          </button>

          <!-- Notification Bell (when authenticated) -->
          <a *ngIf="currentUser" routerLink="/notifications"
             class="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span>🔔</span>
            <span *ngIf="unreadNotifications > 0"
                  class="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
              {{ unreadNotifications }}
            </span>
          </a>

          <!-- User Authenticated Menu -->
          <ng-container *ngIf="currentUser; else guestMenu">
            <div class="relative flex items-center gap-2">
              <a [routerLink]="getDashboardRoute()"
                 class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-500 text-xs font-semibold">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Dashboard</span>
              </a>

              <div class="flex items-center gap-2 pl-2">
                <div class="text-right hidden sm:block">
                  <span class="block text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                    {{ currentUser.fullName }}
                  </span>
                  <span class="text-[10px] text-gray-500 dark:text-gray-400 uppercase">
                    {{ currentUser.role }} ({{ currentUser.bloodGroup }})
                  </span>
                </div>
                <button (click)="logout()"
                        class="p-2 text-xs font-medium text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="Logout">
                  🚪
                </button>
              </div>
            </div>
          </ng-container>

          <!-- Guest Menu -->
          <ng-template #guestMenu>
            <div class="flex items-center gap-2">
              <a routerLink="/login"
                 class="text-sm font-semibold px-3 py-1.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Sign In
              </a>
              <a routerLink="/register"
                 class="text-sm font-semibold px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 transition-all hover:shadow-red-600/40">
                Become a Donor
              </a>
            </div>
          </ng-template>

          <!-- Mobile Menu Button -->
          <button (click)="mobileMenuOpen = !mobileMenuOpen"
                  class="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            ☰
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div *ngIf="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] px-4 py-4 space-y-3 animate-fade-in">
        <a (click)="mobileMenuOpen=false" routerLink="/requests" class="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200">Blood Requests</a>
        <a (click)="mobileMenuOpen=false" routerLink="/donors" class="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200">Find Donors</a>
        <a (click)="mobileMenuOpen=false" routerLink="/hospitals" class="block py-2 text-sm font-medium text-gray-700 dark:text-gray-200">Hospitals</a>
        <a (click)="mobileMenuOpen=false" routerLink="/emergency" class="block py-2 text-sm font-bold text-red-600">🚨 Emergency Request</a>
        <div *ngIf="currentUser" class="pt-2 border-t border-gray-100 dark:border-gray-800">
          <a (click)="mobileMenuOpen=false" [routerLink]="getDashboardRoute()" class="block py-2 text-sm font-semibold text-gray-900 dark:text-white">My Dashboard</a>
          <button (click)="logout()" class="block w-full text-left py-2 text-sm text-red-600 font-semibold">Sign Out</button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  currentUser: AuthResponse | null = null;
  unreadNotifications = 0;
  mobileMenuOpen = false;

  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private notificationService: NotificationService,
    private wsService: WebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.fetchUnreadNotifications();
      }
    });

    // Listen to real-time notification events
    this.wsService.notifications$.subscribe(() => {
      this.unreadNotifications++;
    });
  }

  fetchUnreadNotifications(): void {
    this.notificationService.getMyNotifications().subscribe({
      next: (list) => {
        this.unreadNotifications = list.filter(n => !n.isRead).length;
      },
      error: () => {}
    });
  }

  getDashboardRoute(): string {
    if (!this.currentUser) return '/dashboard';
    switch (this.currentUser.role) {
      case 'ADMIN': return '/dashboard/admin';
      case 'HOSPITAL': return '/dashboard/hospital';
      case 'REQUESTER': return '/dashboard/requester';
      default: return '/dashboard/donor';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
