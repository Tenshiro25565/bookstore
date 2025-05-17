import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleServiceComponent } from './role-service.component';

describe('RoleServiceComponent', () => {
  let component: RoleServiceComponent;
  let fixture: ComponentFixture<RoleServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
