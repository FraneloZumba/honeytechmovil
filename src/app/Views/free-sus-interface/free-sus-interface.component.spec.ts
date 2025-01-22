import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSusInterfaceComponent } from './free-sus-interface.component';

describe('FreeSusInterfaceComponent', () => {
  let component: FreeSusInterfaceComponent;
  let fixture: ComponentFixture<FreeSusInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeSusInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeSusInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
