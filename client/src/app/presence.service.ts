import { Injectable, signal } from '@angular/core';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export interface CursorPosition {
  x: number;
  y: number;
  element: string;
}

export interface UserPresence {
  id: string;
  name: string;
  color: string;
  cursor?: CursorPosition;
  lastSeen: number;
}

@Injectable({ providedIn: 'root' })
export class PresenceService {
  private readonly collab = new WebsocketProvider(
    `wss://${window.location.host}`,
    'presence-room',
    new Y.Doc()
  );

  private readonly awareness = this.collab.awareness;
  private readonly userId = this.generateUserId();
  private readonly userName = this.generateUserName();
  private readonly userColor = this.generateUserColor();

  readonly users = signal<Map<string, UserPresence>>(new Map());
  readonly localUser = signal<UserPresence>({
    id: this.userId,
    name: this.userName,
    color: this.userColor,
    lastSeen: Date.now()
  });

  constructor() {
    this.awareness.setLocalStateField('user', {
      id: this.userId,
      name: this.userName,
      color: this.userColor,
      lastSeen: Date.now()
    });

    this.awareness.on('change', () => {
      this.updateUsers();
    });

    this.awareness.on('update', () => {
      this.updateUsers();
    });

    this.updateUsers();
  }

  updateCursor(x: number, y: number, element: string) {
    this.awareness.setLocalStateField('user', {
      id: this.userId,
      name: this.userName,
      color: this.userColor,
      cursor: { x, y, element },
      lastSeen: Date.now()
    });
  }

  clearCursor() {
    this.awareness.setLocalStateField('user', {
      id: this.userId,
      name: this.userName,
      color: this.userColor,
      lastSeen: Date.now()
    });
  }

  private updateUsers() {
    const users = new Map<string, UserPresence>();
    const now = Date.now();

    this.awareness.getStates().forEach((state, clientId) => {
      if (state.user && clientId !== this.awareness.clientID) {
        const user = state.user as UserPresence;
        if (now - user.lastSeen < 30000) {
          users.set(clientId.toString(), user);
        }
      }
    });

    this.users.set(users);
  }

  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }

  private generateUserName(): string {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
    return names[Math.floor(Math.random() * names.length)];
  }

  private generateUserColor(): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
