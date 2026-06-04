import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Note } from '../models/note.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly apiUrl = 'api/notes';

  constructor(
    private http: HttpClient,
    private loggingService: LoggingService
  ) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note).pipe(
      tap((created) => this.loggingService.logCreate(created))
    );
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note).pipe(
      tap(() => this.loggingService.logUpdate(note))
    );
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loggingService.logDelete(id))
    );
  }
}
