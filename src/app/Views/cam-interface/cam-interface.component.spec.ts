import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamInterfaceComponent } from './cam-interface.component';

describe('CamInterfaceComponent', () => {
  let component: CamInterfaceComponent;
  let fixture: ComponentFixture<CamInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
