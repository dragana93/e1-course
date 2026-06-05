import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  imports: [DatePipe],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  private notesService = inject(NotesService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  notes: Note[] = [];

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService
      .getNotes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (notes) => (this.notes = notes),
        error: (err) => console.error('Failed to load notes', err),
      });
  }

  onAdd(): void {
    this.router.navigate(['/notes/new']);
  }

  onEdit(note: Note): void {
    this.router.navigate(['/notes', note.id, 'edit']);
  }

  onDelete(id: number): void {
    this.notesService
      .deleteNote(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => (this.notes = this.notes.filter((n) => n.id !== id)),
        error: (err) => console.error('Failed to delete note', err),
      });
  }
}
