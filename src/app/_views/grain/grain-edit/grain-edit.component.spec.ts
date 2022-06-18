import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrainEditComponent } from './grain-edit.component';

describe('GrainEditComponent', () => {
  let component: GrainEditComponent;
  let fixture: ComponentFixture<GrainEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrainEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
