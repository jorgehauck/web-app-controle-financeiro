import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoResumoMesComponent } from './grafico-resumo-mes.component';

describe('GraficoResumoMesComponent', () => {
  let component: GraficoResumoMesComponent;
  let fixture: ComponentFixture<GraficoResumoMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoResumoMesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoResumoMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
