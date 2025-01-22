import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumSusInterfaceComponent } from './premium-sus-interface.component';

describe('PremiumSusInterfaceComponent', () => {
  let component: PremiumSusInterfaceComponent;
  let fixture: ComponentFixture<PremiumSusInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumSusInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumSusInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
