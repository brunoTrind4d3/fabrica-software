import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import api from "../_services/api";

@Injectable()
export class EstatisticaService {
  constructor() {}

  redefinirMeta(goal: any): Observable<any> {
    return api.put("/estatistica", { goal: goal });
  }

  salvarLancamento(lancamento: any): Observable<any> {
    return api.post("/estatistica", lancamento);
  }

  async montarGrafico() {
    return await api.get("/estatistica");
  }
}
