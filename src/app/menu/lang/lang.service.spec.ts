import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { LangService } from './lang.service';

describe('LangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([LangService], (service: LangService) => {
    expect(service).toBeTruthy();
  }));
});
