import { Component, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaborationService } from './collaboration.service';
import { PresenceService } from './presence.service';

@Component({
  selector: 'app-approval-flags',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section 
      style="display:grid;gap:.75rem;max-width:320px;padding:1rem;border:1px solid #e5e7eb;border-radius:.75rem;position:relative;"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave()"
    >
      <h2 style="margin:0">Approval Flags</h2>
      <label style="display:flex;gap:.5rem;align-items:center;">
        <input type="checkbox" [checked]="approved()" (change)="onApproved($event)" />
        <span>Approved</span>
      </label>
      <label style="display:flex;gap:.5rem;align-items:center;">
        <input type="checkbox" [checked]="rejected()" (change)="onRejected($event)" />
        <span>Rejected</span>
      </label>
      <small style="color:#6b7280;">Local-first · CRDT synced over one WebSocket</small>
    </section>
  `,
})
export class ApprovalFlagsComponent implements OnDestroy {
  private readonly collab = inject(CollaborationService);
  private readonly presence = inject(PresenceService);

  approved = signal(this.collab.approved);
  rejected = signal(this.collab.rejected);

  private readonly observer = () => {
    this.approved.set(this.collab.approved);
    this.rejected.set(this.collab.rejected);
  };

  constructor() {
    this.collab.flags.observe(this.observer);
  }

  onApproved(ev: Event) {
    const val = (ev.target as HTMLInputElement).checked;
    this.collab.setApproved(val);
  }

  onRejected(ev: Event) {
    const val = (ev.target as HTMLInputElement).checked;
    this.collab.setRejected(val);
  }

  onMouseMove(ev: MouseEvent) {
    const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect();
    this.presence.updateCursor(
      ev.clientX,
      ev.clientY,
      'approval-flags'
    );
  }

  onMouseLeave() {
    this.presence.clearCursor();
  }

  ngOnDestroy() {
    this.collab.flags.unobserve(this.observer);
  }
}

