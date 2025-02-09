import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightInterfaceComponent } from './weight-interface.component';

describe('WeightInterfaceComponent', () => {
  let component: WeightInterfaceComponent;
  let fixture: ComponentFixture<WeightInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
