import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  public isDarkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.applyTheme(this.darkModeSubject.value);
  }

  public toggleTheme(): void {
    const next = !this.darkModeSubject.value;
    this.darkModeSubject.next(next);
    localStorage.setItem('drop4life_theme', next ? 'dark' : 'light');
    this.applyTheme(next);
  }

  public get isDark(): boolean {
    return this.darkModeSubject.value;
  }

  private applyTheme(dark: boolean): void {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private getInitialTheme(): boolean {
    const saved = localStorage.getItem('drop4life_theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
