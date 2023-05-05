/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResumoMesService } from './resumo-mes.service';

describe('Service: ResumoMes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResumoMesService]
    });
  });

  it('should ...', inject([ResumoMesService], (service: ResumoMesService) => {
    expect(service).toBeTruthy();
  }));
});
