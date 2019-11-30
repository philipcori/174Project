import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsHomepageComponent } from './sections-homepage.component';

describe('SectionsHomepageComponent', () => {
  let component: SectionsHomepageComponent;
  let fixture: ComponentFixture<SectionsHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
