import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDelecaoComponent } from './modal-delecao.component';

describe('ModalDelecaoComponent', () => {
  let component: ModalDelecaoComponent;
  let fixture: ComponentFixture<ModalDelecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDelecaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
