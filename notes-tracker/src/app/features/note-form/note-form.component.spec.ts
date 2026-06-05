import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoteFormComponent } from './note-form.component';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';

describe('NoteFormComponent', () => {
  let component: NoteFormComponent;
  let fixture: ComponentFixture<NoteFormComponent>;
  let notesServiceSpy: jasmine.SpyObj<NotesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockNote: Note = {
    id: 1,
    title: 'Test Note',
    content: 'Test content',
    lastModified: new Date('2026-06-01'),
  };

  async function setup(paramId: string | null = null): Promise<void> {
    notesServiceSpy = jasmine.createSpyObj('NotesService', [
      'getNotes',
      'createNote',
      'updateNote',
    ]);
    notesServiceSpy.getNotes.and.returnValue(of([mockNote]));
    notesServiceSpy.createNote.and.returnValue(of(mockNote));
    notesServiceSpy.updateNote.and.returnValue(of(mockNote));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NoteFormComponent],
      providers: [
        { provide: NotesService, useValue: notesServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => paramId } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('createNote', () => {
    beforeEach(async () => setup(null));

    it('should call createNote and navigate on submit', () => {
      component.noteForm.setValue({ title: 'New Note', content: 'New content' });
      component.onSubmit();
      expect(notesServiceSpy.createNote).toHaveBeenCalledWith(
        jasmine.objectContaining({ title: 'New Note', content: 'New content' })
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes']);
    });
  });

  describe('updateNote', () => {
    beforeEach(async () => setup('1'));

    it('should load the note for editing', () => {
      expect(component.editingNote).toEqual(mockNote);
    });

    it('should call updateNote and navigate on submit', () => {
      component.noteForm.setValue({ title: 'Updated', content: 'Updated content' });
      component.onSubmit();
      expect(notesServiceSpy.updateNote).toHaveBeenCalledWith(
        jasmine.objectContaining({ id: 1, title: 'Updated', content: 'Updated content' })
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/notes']);
    });
  });
});
