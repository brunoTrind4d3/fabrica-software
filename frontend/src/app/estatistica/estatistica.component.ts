import { Component, OnInit } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBr from "@fullcalendar/core/locales/pt-br";
import { EstatisticaService } from "./estatistica.service";
import * as Yup from "yup";
import api from "../_services/api";

import Swal from "sweetalert2";

@Component({
  selector: "a-estatistica",
  templateUrl: "./estatistica.component.html",
  styleUrls: ["./estatistica.component.css"],
})
export class EstatisticaComponent implements OnInit {
  val: number;
  lucro: number;

  dataGrafico: any;
  optionsGrafico: any;

  public lancamento;
  schema: any;

  constructor(private estatisticaService: EstatisticaService) {}

  ngOnInit() {
    const { user } = JSON.parse(localStorage.getItem("currentUser"));
    this.val = user.goal;
    this.calcularLucro();
    this.montarGrafico();

    this.schema = Yup.object().shape({
      horasTrabalhadas: Yup.number().required("Campo obrigatório"),
      consumoVeiculo: Yup.number().required("Campo obrigatório"),
      valorCombustivel: Yup.number().required("Campo obrigatório"),
      quilometrosRodados: Yup.number().required("Campo obrigatório"),
      quantidadeViagens: Yup.number().required("Campo obrigatório"),
      receitaObtida: Yup.number().required("Campo obrigatório"),
    });

    this.optionsGrafico = {
      annotation: {
        // use global plugin.
        annotations: [
          {
            drawTime: "afterDraw",
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: this.val,
            borderColor: "#000000",
            borderWidth: 2,
            label: {
              backgroundColor: "#FF",
              content: "Sua meta",
              enabled: true,
              position: "center",
            },
          },
        ],
      },
      title: {
        display: true,
        fontSize: 16,
      },
      legend: {
        position: "bottom",
      },
    };

    this.iniciarLancamento();
  }

  iniciarLancamento() {
    this.lancamento = {
      horasTrabalhadas: null,
      consumoVeiculo: null,
      valorCombustivel: null,
      quilometrosRodados: null,
      quantidadeViagens: null,
      receitaObtida: null,
    };
  }

  async montarGrafico() {
    const response = await api.get("/estatistica");
    this.dataGrafico = response.data.data;
  }

  async calcularLucro() {
    const { user } = JSON.parse(localStorage.getItem("currentUser"));

    const response = await api.get(`/estatistica/${user.id}`);
    console.log(response.data);
    this.lucro = response.data;
  }

  async redefinirMeta() {
    this.optionsGrafico.annotation.annotations.value = this.val;

    const response = await api.put("/estatistica", { goal: this.val });
    if (response.status === 200) {
      Swal.fire({
        title: "Sucesso",
        text: "Meta redefinida com sucesso!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Erro",
        text: "Falha ao atualizar o meta!",
        icon: "error",
        showCancelButton: true,
      });
    }
  }

  async realizarLancamento() {
    if (await this.schema.isValid(this.lancamento)) {
      Swal.fire({
        text: "Verifique os dados antes de enviá-los. Prosseguir o envio??",
        showCancelButton: true,
        icon: "question",
        cancelButtonText: "Não",
        confirmButtonText: "Confirmar",
      }).then(async (result) => {
        if (result.value) {
          const response = await api.post("/estatistica", this.lancamento);
          if (response.status === 200) {
            Swal.fire({
              title: "Sucesso",
              text: "Lançamento realizado com sucesso!",
              icon: "success",
              showCancelButton: true,
            });
            this.iniciarLancamento();
          } else {
            Swal.fire({
              title: "Erro",
              text: "Falha ao realizar o lançamento!",
              icon: "error",
              showCancelButton: true,
            });
          }
        }
      });
    } else {
      Swal.fire({
        title: "Erro",
        text: "Os campos possuem informações erradas, favor verifique!",
        icon: "error",
        showCancelButton: true,
      });
    }
  }
}
