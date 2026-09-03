import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrgencyLevel } from '../../../core/models/models';

@Component({
  selector: 'app-urgency-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="inline-flex items-center gap-1 font-semibold rounded-full uppercase tracking-wider text-xs px-2.5 py-0.5"
          [ngClass]="urgencyClass">
      <span *ngIf="urgency === 'CRITICAL'" class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
      {{ urgency }}
    </span>
  `
})
export class UrgencyBadgeComponent {
  @Input({ required: true }) urgency!: UrgencyLevel | string;

  get urgencyClass(): string {
    switch (this.urgency) {
      case 'CRITICAL':
        return 'bg-red-600 text-white shadow-sm ring-1 ring-red-500';
      case 'URGENT':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800';
      default:
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800';
    }
  }
}
