import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FooterComponent } from './footer.component';
import { ApiService } from '@acme/shared/data-access';

describe('TicketsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
      declarations: [FooterComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
