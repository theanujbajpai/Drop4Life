import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastContainerComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastContainerComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 transition-colors">
      <app-header></app-header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
      <app-toast-container></app-toast-container>
    </div>
  `
})
export class AppComponent {
  title = 'Drop4Life';
}
