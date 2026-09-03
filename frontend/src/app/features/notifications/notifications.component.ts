import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/feature.services';
import { NotificationItem } from '../../core/models/models';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  template: `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white font-display">Notifications</h1>
          <p class="text-xs text-gray-500">Live emergency updates and match requests</p>
        </div>
      </div>

      <div *ngIf="notifications.length === 0">
        <app-empty-state icon="🔔" title="No Notifications Yet"
                         description="You are completely up to date. We will alert you whenever blood is needed.">
        </app-empty-state>
      </div>

      <div class="space-y-3">
        <div *ngFor="let n of notifications"
             (click)="markRead(n)"
             class="p-4 rounded-2xl border transition-all cursor-pointer"
             [ngClass]="n.isRead ? 'bg-white dark:bg-dark-card border-gray-200 dark:border-gray-800' : 'bg-red-50/50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 shadow-xs'">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="font-bold text-sm text-gray-900 dark:text-white">{{ n.title }}</h3>
              <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">{{ n.message }}</p>
              <span class="text-[10px] text-gray-400 mt-2 block">{{ n.createdAt | date:'short' }}</span>
            </div>
            <span *ngIf="!n.isRead" class="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-1"></span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationItem[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getMyNotifications().subscribe({
      next: (data: NotificationItem[]) => this.notifications = data,
      error: () => {}
    });
  }

  markRead(n: NotificationItem): void {
    if (!n.isRead) {
      n.isRead = true;
      this.notificationService.markAsRead(n.id).subscribe();
    }
  }
}
