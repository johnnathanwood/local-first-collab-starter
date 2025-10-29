import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresenceService, UserPresence } from './presence.service';

@Component({
  selector: 'app-presence-bubbles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="presence-container">
      <div 
        *ngFor="let user of users()" 
        class="presence-bubble"
        [style.left.px]="user.cursor?.x || 0"
        [style.top.px]="user.cursor?.y || 0"
        [style.background-color]="user.color"
        [class.visible]="!!user.cursor"
      >
        <div class="bubble-content">
          <div class="user-avatar" [style.background-color]="user.color">
            {{ user.name.charAt(0) }}
          </div>
          <div class="user-name">{{ user.name }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .presence-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1000;
    }

    .presence-bubble {
      position: absolute;
      transform: translate(-50%, -100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .presence-bubble.visible {
      opacity: 1;
    }

    .bubble-content {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid currentColor;
      border-radius: 20px;
      padding: 4px 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(4px);
    }

    .user-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
    }

    .user-name {
      font-size: 12px;
      font-weight: 500;
      color: #333;
      white-space: nowrap;
    }
  `]
})
export class PresenceBubblesComponent {
  private readonly presence = inject(PresenceService);
  
  users = computed(() => {
    const userMap = this.presence.users();
    return Array.from(userMap.values());
  });
}
