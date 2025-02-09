import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityInterfaceComponent } from './humidity-interface.component';

describe('HumidityInterfaceComponent', () => {
  let component: HumidityInterfaceComponent;
  let fixture: ComponentFixture<HumidityInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumidityInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidityInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
