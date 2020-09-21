import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensFormularioComponent } from './itens-formulario.component';

describe('ItensFormularioComponent', () => {
  let component: ItensFormularioComponent;
  let fixture: ComponentFixture<ItensFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
