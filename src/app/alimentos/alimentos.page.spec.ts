import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosPage } from './alimentos.page';

describe('Alimentos', () => {
  let component: AlimentosPage;
  let fixture: ComponentFixture<AlimentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlimentosPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
