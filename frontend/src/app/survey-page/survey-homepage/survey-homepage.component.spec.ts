import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyHomepageComponent } from './survey-homepage.component';

describe('SurveyHomepageComponent', () => {
  let component: SurveyHomepageComponent;
  let fixture: ComponentFixture<SurveyHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
