import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteModalComponent } from './incomplete-modal.component';

describe('IncompleteModalComponent', () => {
  let component: IncompleteModalComponent;
  let fixture: ComponentFixture<IncompleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncompleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
