import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableViewComponent } from './available-view.component';

describe('AvailableViewComponent', () => {
  let component: AvailableViewComponent;
  let fixture: ComponentFixture<AvailableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
