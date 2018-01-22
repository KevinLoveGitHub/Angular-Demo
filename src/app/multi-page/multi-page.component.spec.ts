import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPageComponent } from './multi-page.component';

describe('MultiPageComponent', () => {
  let component: MultiPageComponent;
  let fixture: ComponentFixture<MultiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
