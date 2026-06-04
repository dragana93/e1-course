import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NotesComponent } from './notes.component';
import { NotesService } from '../../services/notes.service';
import { LoggingService } from '../../services/logging.service';
import { of } from 'rxjs';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let notesServiceSpy: jasmine.SpyObj<NotesService>;

  beforeEach(async () => {
    notesServiceSpy = jasmine.createSpyObj('NotesService', [
      'getNotes',
      'createNote',
      'updateNote',
      'deleteNote',
    ]);
    notesServiceSpy.getNotes.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [NotesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: NotesService, useValue: notesServiceSpy },
        { provide: LoggingService, useValue: jasmine.createSpyObj('LoggingService', ['logCreate', 'logUpdate', 'logDelete']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
