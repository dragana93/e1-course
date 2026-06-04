import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { notes: Note[] } {
    const notes: Note[] = [
      {
        id: 1,
        title: 'First Note',
        content: 'This is the content of the first note.',
        lastModified: new Date('2026-06-01T10:00:00'),
      },
      {
        id: 2,
        title: 'Second Note',
        content: 'This is the content of the second note.',
        lastModified: new Date('2026-06-02T11:30:00'),
      },
      {
        id: 3,
        title: 'Third Note',
        content: 'This is the content of the third note.',
        lastModified: new Date('2026-06-03T14:45:00'),
      },
    ];

    return { notes };
  }
}
