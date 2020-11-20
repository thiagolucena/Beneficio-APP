/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovimentacaoServiceService } from './movimentacaoService.service';

describe('Service: MovimentacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimentacaoServiceService]
    });
  });

  it('should ...', inject([MovimentacaoServiceService], (service: MovimentacaoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
