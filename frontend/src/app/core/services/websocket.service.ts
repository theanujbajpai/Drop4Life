import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Client, IMessage } from '@stomp/stompjs';
import { environment } from '../../../environments/environment';
import { NotificationItem, ChatMessage } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client | null = null;
  private notificationSubject = new Subject<NotificationItem>();
  private messageSubject = new Subject<ChatMessage>();

  public notifications$: Observable<NotificationItem> = this.notificationSubject.asObservable();
  public messages$: Observable<ChatMessage> = this.messageSubject.asObservable();

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.connect(user.userId);
      } else {
        this.disconnect();
      }
    });
  }

  public connect(userId: string): void {
    if (this.client && this.client.active) {
      return;
    }

    this.client = new Client({
      brokerURL: environment.wsUrl.replace('http', 'ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        // Subscribe to user personal notifications
        this.client?.subscribe(`/user/queue/notifications`, (message: IMessage) => {
          try {
            const notification: NotificationItem = JSON.parse(message.body);
            this.notificationSubject.next(notification);
          } catch (e) {
            console.error('Error parsing notification', e);
          }
        });

        // Subscribe to user personal messages
        this.client?.subscribe(`/user/queue/messages`, (message: IMessage) => {
          try {
            const chat: ChatMessage = JSON.parse(message.body);
            this.messageSubject.next(chat);
          } catch (e) {
            console.error('Error parsing chat message', e);
          }
        });
      },
      onStompError: (frame) => {
        console.warn('STOMP error:', frame);
      }
    });

    try {
      this.client.activate();
    } catch (e) {
      console.warn('WebSocket connection not established (backend may be offline)', e);
    }
  }

  public disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
  }
}
