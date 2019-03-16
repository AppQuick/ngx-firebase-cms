import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicBuilderComponent } from './dynamic-builder.component';

describe('DynamicBuilderComponent', () => {
  let component: DynamicBuilderComponent;
  let fixture: ComponentFixture<DynamicBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
