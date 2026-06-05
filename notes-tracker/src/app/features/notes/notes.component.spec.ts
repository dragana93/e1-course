import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NotesComponent } from './notes.component';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let notesServiceSpy: jasmine.SpyObj<NotesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockNote: Note = {
    id: 1,
    title: 'Test Note',
    content: 'Test content',
    lastModified: new Date('2026-06-01'),
  };

  beforeEach(async () => {
    notesServiceSpy = jasmine.createSpyObj('NotesService', ['getNotes', 'deleteNote']);
    notesServiceSpy.getNotes.and.returnValue(of([mockNote]));
    notesServiceSpy.deleteNote.and.returnValue(of(undefined));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NotesComponent],
      providers: [
        { provide: NotesService, useValue: notesServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load notes on init', () => {
    expect(notesServiceSpy.getNotes).toHaveBeenCalled();
    expect(component.notes).toEqual([mockNote]);
  });

  describe('onDelete', () => {
    it('should call deleteNote and remove the note from the list', () => {
      component.onDelete(mockNote.id);
      expect(notesServiceSpy.deleteNote).toHaveBeenCalledWith(mockNote.id);
      expect(component.notes).toEqual([]);
    });
  });

  describe('onEdit', () => {
    it('should navigate to the edit route', () => {
      component.onEdit(mockNote);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes', mockNote.id, 'edit']);
    });
  });

  describe('onAdd', () => {
    it('should navigate to the new note route', () => {
      component.onAdd();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes/new']);
    });
  });
});
