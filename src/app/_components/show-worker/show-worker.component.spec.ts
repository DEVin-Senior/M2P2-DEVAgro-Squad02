import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWorkerComponent } from './show-worker.component';

describe('ShowWorkerComponent', () => {
  let component: ShowWorkerComponent;
  let fixture: ComponentFixture<ShowWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
