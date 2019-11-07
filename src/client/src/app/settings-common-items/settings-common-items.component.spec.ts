import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCommonItemsComponent } from './settings-common-items.component';

describe('SettingsCommonItemsComponent', () => {
  let component: SettingsCommonItemsComponent;
  let fixture: ComponentFixture<SettingsCommonItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCommonItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCommonItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
