import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmTableComponent } from './farm-table.component';

describe('FarmTableComponent', () => {
  let component: FarmTableComponent;
  let fixture: ComponentFixture<FarmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
