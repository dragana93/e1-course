import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
})
export class NoteFormComponent implements OnInit {
  private notesService = inject(NotesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  editingNote: Note | null = null;

  noteForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.notesService.getNotes()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (notes) => {
            const note = notes.find((n) => n.id === +id) ?? null;
            if (note) {
              this.editingNote = note;
              this.noteForm.setValue({ title: note.title, content: note.content });
            }
          },
          error: (err) => console.error('Failed to load note', err),
        });
    }
  }

  onSubmit(): void {
    if (this.noteForm.invalid) return;

    const { title, content } = this.noteForm.getRawValue();

    if (this.editingNote) {
      const updated: Note = { ...this.editingNote, title, content, lastModified: new Date() };
      this.notesService.updateNote(updated)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => this.router.navigate(['/notes']),
          error: (err) => console.error('Failed to update note', err),
        });
    } else {
      const newNote: Note = { id: 0, title, content, lastModified: new Date() };
      this.notesService.createNote(newNote)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => this.router.navigate(['/notes']),
          error: (err) => console.error('Failed to create note', err),
        });
    }
  }

  onCancel(): void {
    this.router.navigate(['/notes']);
  }
}
