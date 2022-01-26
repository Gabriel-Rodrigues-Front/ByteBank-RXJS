import { Observable } from 'rxjs';
import { Acao, Acoes, AcoesAPI } from './model/acoes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, pluck, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  getAcoes(valor?: string):Observable<Acoes> {
      const params = valor ? new HttpParams().append('valor', valor) : null;
      const acoesObservable = this.httpClient.get<any>('http://localhost:3000/acoes', {params}).pipe(
        tap( (data) => console.log(data)),
        pluck('payload'),
        map ( (result): Acoes => {
          return result.sort( (AcaoA, AcaoB) => {
            this.ordenaPorCodigo(AcaoA, AcaoB);
          })
        })
      );

      return acoesObservable;
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.Codigo > acaoB.Codigo) {
      return 1;
    }

    if(acaoA.Codigo < acaoB.Codigo) {
      return -1;
    }

    return 0;
  }
}
