import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminselectorComponent } from './adminselector.component';

describe('AdminselectorComponent', () => {
  let component: AdminselectorComponent;
  let fixture: ComponentFixture<AdminselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminselectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
