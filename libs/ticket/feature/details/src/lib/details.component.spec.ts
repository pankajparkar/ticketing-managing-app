import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TicketListComponent } from './list.component';
import { ApiService } from '@acme/shared/data-access';

describe('TicketsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
      declarations: [TicketListComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TicketListComponent);
    const component = fixture.componentInstance;
    const apiService = TestBed.inject(ApiService);
    jest.spyOn(apiService, 'tickets').mockImplementation(() => of([]));
    jest.spyOn(apiService, 'users').mockImplementation(() => of([]));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
