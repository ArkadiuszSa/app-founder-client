import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManageComponent } from './team-manage.component';

describe('TeamManagePanelComponent', () => {
  let component: TeamManageComponent;
  let fixture: ComponentFixture<TeamManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
