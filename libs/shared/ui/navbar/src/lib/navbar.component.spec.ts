import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NavbarComponent } from './navbar.component';

describe('TicketsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NavbarComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
