import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodGroup } from '../../../core/models/models';

@Component({
  selector: 'app-blood-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="inline-flex items-center justify-center font-bold rounded-md tracking-wide shadow-sm"
          [ngClass]="badgeClass">
      <span class="mr-1 text-xs opacity-75">🩸</span>{{ bloodGroup }}
    </span>
  `
})
export class BloodBadgeComponent {
  @Input({ required: true }) bloodGroup!: BloodGroup | string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get badgeClass(): string {
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3.5 py-1.5 text-base'
    };

    return `${sizeClasses[this.size]} bg-red-100 text-red-800 border border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900/60`;
  }
}
