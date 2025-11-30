import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsmanComponent } from './sportsman.component';

describe('SportsmanComponent', () => {
  let component: SportsmanComponent;
  let fixture: ComponentFixture<SportsmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsmanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
