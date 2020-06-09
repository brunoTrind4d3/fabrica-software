import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class ConfiguracaoService {
  constructor(private http: HttpClient) {}

  carregarUFs(): Observable<any> {
    return this.http
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados
    `);
  }

  carregarCidade(UF: any): Observable<any> {
    return this.http
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios
    `);
  }

  carregarMarcas(): Observable<any> {
    return this.http.get(`http://fipeapi.appspot.com/api/1/carros/marcas.json
    `);
  }

  carregarModelos(marca: any): Observable<any> {
    return this.http
      .get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${marca}.json
    `);
  }
}
