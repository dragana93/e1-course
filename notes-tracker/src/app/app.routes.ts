import { Routes } from '@angular/router';
import { NotesComponent } from './features/notes/notes.component';
import { NoteFormComponent } from './features/note-form/note-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NotesComponent },
  { path: 'notes/new', component: NoteFormComponent },
  { path: 'notes/:id/edit', component: NoteFormComponent },
];
