import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  noteForm: FormGroup;
  editingNote: Note | null = null;

  constructor(
    private notesService: NotesService,
    private fb: FormBuilder
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe((notes) => (this.notes = notes));
  }

  onSubmit(): void {
    if (this.noteForm.invalid) return;

    const { title, content } = this.noteForm.value;

    if (this.editingNote) {
      const updated: Note = { ...this.editingNote, title, content, lastModified: new Date() };
      this.notesService.updateNote(updated).subscribe(() => {
        this.loadNotes();
        this.resetForm();
      });
    } else {
      const newNote: Note = { id: 0, title, content, lastModified: new Date() };
      this.notesService.createNote(newNote).subscribe(() => {
        this.loadNotes();
        this.resetForm();
      });
    }
  }

  onEdit(note: Note): void {
    this.editingNote = note;
    this.noteForm.setValue({ title: note.title, content: note.content });
  }

  onDelete(id: number): void {
    this.notesService.deleteNote(id).subscribe(() => this.loadNotes());
  }

  resetForm(): void {
    this.editingNote = null;
    this.noteForm.reset();
  }
}
