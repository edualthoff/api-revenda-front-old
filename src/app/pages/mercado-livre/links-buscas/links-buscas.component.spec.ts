import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksBuscasComponent } from './links-buscas.component';

describe('LinksBuscasComponent', () => {
  let component: LinksBuscasComponent;
  let fixture: ComponentFixture<LinksBuscasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksBuscasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksBuscasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
