import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksFormularioComponent } from './links-formulario.component';

describe('LinksFormularioComponent', () => {
  let component: LinksFormularioComponent;
  let fixture: ComponentFixture<LinksFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
