import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  logCreate(note: Note): void {
    console.log('[CREATE] Note created:', note);
  }

  logUpdate(note: Note): void {
    console.log('[UPDATE] Note updated:', note);
  }

  logDelete(id: number): void {
    console.log('[DELETE] Note deleted with id:', id);
  }
}
