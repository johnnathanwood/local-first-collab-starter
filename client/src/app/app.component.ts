import { Component } from '@angular/core';
import { ApprovalFlagsComponent } from './approval-flags.component';
import { PresenceBubblesComponent } from './presence-bubbles.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ApprovalFlagsComponent, PresenceBubblesComponent],
  template: `
    <main style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;display:grid;place-items:center;min-height:100dvh;">
      <app-approval-flags />
      <app-presence-bubbles />
    </main>
  `,
})
export class AppComponent {}

