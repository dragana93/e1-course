import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';
import { Note } from '../models/note.model';

describe('LoggingService', () => {
  let service: LoggingService;
  let consoleSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
    consoleSpy = spyOn(console, 'log');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('logCreate', () => {
    it('should log a create message with the note', () => {
      const note: Note = { id: 1, title: 'Test Note', content: 'Content', lastModified: new Date() };

      service.logCreate(note);

      expect(consoleSpy).toHaveBeenCalledWith('[CREATE] Note created:', note);
    });
  });

  describe('logUpdate', () => {
    it('should log an update message with the note', () => {
      const note: Note = { id: 2, title: 'Updated Note', content: 'Updated content', lastModified: new Date() };

      service.logUpdate(note);

      expect(consoleSpy).toHaveBeenCalledWith('[UPDATE] Note updated:', note);
    });
  });

  describe('logDelete', () => {
    it('should log a delete message with the note id', () => {
      const id = 3;

      service.logDelete(id);

      expect(consoleSpy).toHaveBeenCalledWith('[DELETE] Note deleted with id:', id);
    });
  });
});
