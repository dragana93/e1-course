import { Routes } from '@angular/router';
import { NotesComponent } from './features/notes/notes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NotesComponent },
];
