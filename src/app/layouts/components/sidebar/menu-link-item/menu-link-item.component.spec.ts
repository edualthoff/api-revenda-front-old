import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLinkItemComponent } from './menu-link-item.component';

describe('MenuLinkItemComponent', () => {
  let component: MenuLinkItemComponent;
  let fixture: ComponentFixture<MenuLinkItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLinkItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLinkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
