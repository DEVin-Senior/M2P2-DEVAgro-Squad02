import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrainFormComponent } from './grain-form.component';

describe('GrainFormComponent', () => {
  let component: GrainFormComponent;
  let fixture: ComponentFixture<GrainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrainFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
