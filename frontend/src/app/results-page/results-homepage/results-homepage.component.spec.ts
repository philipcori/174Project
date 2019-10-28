import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsHomepageComponent } from './results-homepage.component';

describe('ResultsHomepageComponent', () => {
  let component: ResultsHomepageComponent;
  let fixture: ComponentFixture<ResultsHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
