import { Injectable } from '@angular/core';
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebsocketProvider } from 'y-websocket';

const ROOM_ID = 'demo-approval-flags-v1';

@Injectable({ providedIn: 'root' })
export class CollaborationService {
  readonly doc = new Y.Doc();

  readonly flags = this.doc.getMap<boolean>('flags');

  private readonly persist = new IndexeddbPersistence(ROOM_ID, this.doc);

  private readonly provider = new WebsocketProvider(
    `wss://${window.location.host}`,
    ROOM_ID,
    this.doc,
    {
      connect: true,
    },
  );

  constructor() {
    this.doc.transact(() => {
      if (!this.flags.has('approved')) this.flags.set('approved', false);
      if (!this.flags.has('rejected')) this.flags.set('rejected', false);
    });
  }

  get approved() { return this.flags.get('approved') ?? false; }
  get rejected() { return this.flags.get('rejected') ?? false; }

  setApproved(val: boolean) { this.flags.set('approved', val); }
  setRejected(val: boolean) { this.flags.set('rejected', val); }
}

