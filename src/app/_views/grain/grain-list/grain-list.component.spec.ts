import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrainListComponent } from './grain-list.component';

describe('GrainListComponent', () => {
  let component: GrainListComponent;
  let fixture: ComponentFixture<GrainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrainListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
