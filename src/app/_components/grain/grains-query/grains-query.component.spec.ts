import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrainsQueryComponent } from './grains-query.component';

describe('GrainsQueryComponent', () => {
  let component: GrainsQueryComponent;
  let fixture: ComponentFixture<GrainsQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrainsQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrainsQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
