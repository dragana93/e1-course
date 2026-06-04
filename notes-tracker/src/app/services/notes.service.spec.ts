import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NotesService } from './notes.service';
import { LoggingService } from './logging.service';
import { Note } from '../models/note.model';

describe('NotesService', () => {
  let service: NotesService;
  let httpTesting: HttpTestingController;
  let loggingServiceSpy: jasmine.SpyObj<LoggingService>;

  const mockNote: Note = {
    id: 1,
    title: 'Test Note',
    content: 'Test content',
    lastModified: new Date('2026-06-01'),
  };

  beforeEach(() => {
    loggingServiceSpy = jasmine.createSpyObj('LoggingService', [
      'logCreate',
      'logUpdate',
      'logDelete',
    ]);

    TestBed.configureTestingModule({
      providers: [
        NotesService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LoggingService, useValue: loggingServiceSpy },
      ],
    });

    service = TestBed.inject(NotesService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('createNote', () => {
    it('should POST the note and return the created note', () => {
      service.createNote(mockNote).subscribe((result) => {
        expect(result).toEqual(mockNote);
      });

      const req = httpTesting.expectOne('api/notes');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockNote);
      req.flush(mockNote);
    });

    it('should call logCreate with the created note', () => {
      service.createNote(mockNote).subscribe();

      const req = httpTesting.expectOne('api/notes');
      req.flush(mockNote);

      expect(loggingServiceSpy.logCreate).toHaveBeenCalledOnceWith(mockNote);
    });
  });

  describe('updateNote', () => {
    it('should PUT the note to the correct URL', () => {
      service.updateNote(mockNote).subscribe((result) => {
        expect(result).toEqual(mockNote);
      });

      const req = httpTesting.expectOne(`api/notes/${mockNote.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockNote);
      req.flush(mockNote);
    });

    it('should call logUpdate with the updated note', () => {
      service.updateNote(mockNote).subscribe();

      const req = httpTesting.expectOne(`api/notes/${mockNote.id}`);
      req.flush(mockNote);

      expect(loggingServiceSpy.logUpdate).toHaveBeenCalledOnceWith(mockNote);
    });
  });

  describe('deleteNote', () => {
    it('should DELETE the note at the correct URL', () => {
      service.deleteNote(mockNote.id).subscribe();

      const req = httpTesting.expectOne(`api/notes/${mockNote.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should call logDelete with the note id', () => {
      service.deleteNote(mockNote.id).subscribe();

      const req = httpTesting.expectOne(`api/notes/${mockNote.id}`);
      req.flush(null);

      expect(loggingServiceSpy.logDelete).toHaveBeenCalledOnceWith(mockNote.id);
    });
  });
});
