import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutExtensionComponent } from './about-extension.component';

describe('AboutExtensionComponent', () => {
  let component: AboutExtensionComponent;
  let fixture: ComponentFixture<AboutExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
