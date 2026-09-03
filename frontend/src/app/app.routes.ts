import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
    title: 'Drop4Life — Live Emergency Blood Donation Platform'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Sign In — Drop4Life'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    title: 'Become a Donor — Drop4Life'
  },
  {
    path: 'emergency',
    loadComponent: () => import('./features/emergency/emergency.component').then(m => m.EmergencyComponent),
    title: 'Emergency Blood Request — Drop4Life'
  },
  {
    path: 'donors',
    loadComponent: () => import('./features/donors/find-donors/find-donors.component').then(m => m.FindDonorsComponent),
    title: 'Smart Donor Matching — Drop4Life'
  },
  {
    path: 'requests',
    loadComponent: () => import('./features/blood-requests/request-list/request-list.component').then(m => m.RequestListComponent),
    title: 'Active Blood Requests — Drop4Life'
  },
  {
    path: 'hospitals',
    loadComponent: () => import('./features/hospitals/hospital-list/hospital-list.component').then(m => m.HospitalListComponent),
    title: 'Partner Hospitals & Blood Banks — Drop4Life'
  },
  {
    path: 'notifications',
    canActivate: [authGuard],
    loadComponent: () => import('./features/notifications/notifications.component').then(m => m.NotificationsComponent),
    title: 'Notifications — Drop4Life'
  },

  // Dashboards
  {
    path: 'dashboard',
    redirectTo: 'dashboard/donor',
    pathMatch: 'full'
  },
  {
    path: 'dashboard/donor',
    canActivate: [authGuard, roleGuard(['DONOR', 'ADMIN'])],
    loadComponent: () => import('./features/dashboard/donor-dashboard/donor-dashboard.component').then(m => m.DonorDashboardComponent),
    title: 'Donor Dashboard — Drop4Life'
  },
  {
    path: 'dashboard/requester',
    canActivate: [authGuard, roleGuard(['REQUESTER', 'ADMIN'])],
    loadComponent: () => import('./features/dashboard/requester-dashboard/requester-dashboard.component').then(m => m.RequesterDashboardComponent),
    title: 'Requester Dashboard — Drop4Life'
  },
  {
    path: 'dashboard/hospital',
    canActivate: [authGuard, roleGuard(['HOSPITAL', 'ADMIN'])],
    loadComponent: () => import('./features/dashboard/hospital-dashboard/hospital-dashboard.component').then(m => m.HospitalDashboardComponent),
    title: 'Hospital Portal — Drop4Life'
  },
  {
    path: 'dashboard/admin',
    canActivate: [authGuard, roleGuard(['ADMIN'])],
    loadComponent: () => import('./features/dashboard/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    title: 'Admin Analytics — Drop4Life'
  },

  {
    path: '**',
    redirectTo: ''
  }
];
