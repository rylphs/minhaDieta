import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefeicoesPage } from './refeicoes.page';

describe('RefeicoesPage', () => {
  let component: RefeicoesPage;
  let fixture: ComponentFixture<RefeicoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefeicoesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefeicoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
