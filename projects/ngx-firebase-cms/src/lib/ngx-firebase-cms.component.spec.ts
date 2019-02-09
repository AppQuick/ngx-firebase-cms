import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFirebaseCmsComponent } from './ngx-firebase-cms.component';

describe('NgxFirebaseCmsComponent', () => {
  let component: NgxFirebaseCmsComponent;
  let fixture: ComponentFixture<NgxFirebaseCmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFirebaseCmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFirebaseCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
