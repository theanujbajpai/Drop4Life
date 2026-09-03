import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-12 px-4 text-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white/50 dark:bg-dark-card/50">
      <div class="text-4xl mb-3">{{ icon }}</div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">{{ description }}</p>
      <div class="mt-4">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class EmptyStateComponent {
  @Input() icon: string = '🩸';
  @Input() title: string = 'No records found';
  @Input() description: string = 'There are currently no items matching your criteria.';
}
