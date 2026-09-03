import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  show(type: Toast['type'], message: string, title?: string, durationMs: number = 4000): void {
    const toast: Toast = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      message,
      title
    };

    this.toastsSubject.next([...this.toastsSubject.value, toast]);

    setTimeout(() => {
      this.remove(toast.id);
    }, durationMs);
  }

  success(message: string, title: string = 'Success'): void {
    this.show('success', message, title);
  }

  error(message: string, title: string = 'Error'): void {
    this.show('error', message, title);
  }

  warning(message: string, title: string = 'Notice'): void {
    this.show('warning', message, title);
  }

  info(message: string, title: string = 'Info'): void {
    this.show('info', message, title);
  }

  remove(id: string): void {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }
}
