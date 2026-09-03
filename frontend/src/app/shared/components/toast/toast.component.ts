import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <div *ngFor="let toast of toastService.toasts$ | async"
           class="pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start gap-3 transition-all duration-300 animate-fade-in"
           [ngClass]="getToastClass(toast.type)">
        <div class="text-xl">
          <span *ngIf="toast.type === 'success'">✅</span>
          <span *ngIf="toast.type === 'error'">⚠️</span>
          <span *ngIf="toast.type === 'warning'">⚡</span>
          <span *ngIf="toast.type === 'info'">ℹ️</span>
        </div>
        <div class="flex-1">
          <h4 *ngIf="toast.title" class="font-semibold text-sm">{{ toast.title }}</h4>
          <p class="text-xs mt-0.5 opacity-90">{{ toast.message }}</p>
        </div>
        <button (click)="toastService.remove(toast.id)" class="text-xs opacity-60 hover:opacity-100 p-1">✕</button>
      </div>
    </div>
  `
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}

  getToastClass(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800';
      case 'error':
        return 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800';
      case 'warning':
        return 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800';
      default:
        return 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800';
    }
  }
}
