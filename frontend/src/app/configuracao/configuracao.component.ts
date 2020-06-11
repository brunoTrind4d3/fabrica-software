import { Component, OnInit } from "@angular/core";
import { Veiculo } from "./shared/veiculo.model";
import { Usuario } from "./shared/usuario.model";
import { Endereco } from "./shared/endereco.model";
import api from "../_services/api";

import { ConfiguracaoService } from "./configuracao.service";
import Swal from "sweetalert2";

interface Estado {
  id: number;
  nome: string;
  sigla: string;
}

interface Cidade {
  id: number;
  nome: string;
}

interface Marca {
  id: string;
  name: string;
}
interface Modelo {
  id: string;
  name: string;
}
@Component({
  selector: "a-configuracao",
  templateUrl: "./configuracao.component.html",
  styleUrls: ["./configuracao.component.css"],
})
export class ConfiguracaoComponent implements OnInit {
  usuario: Usuario;
  veiculo: Veiculo;
  endereco: Endereco;

  marcas = [];
  marca: Marca;

  modelos = [];
  modelo: Modelo;

  estados = [];
  estado: Estado;

  cidades = [];
  cidade: Cidade;

  constructor(private configuracaoService: ConfiguracaoService) {}

  ngOnInit() {
    this.usuario = new Usuario();
    this.veiculo = new Veiculo();
    this.endereco = new Endereco();
    this.carregarEstados();
    this.carregarMarcas();
    this.carregarUsuario();
    this.carregarVeiculo();
  }

  carregarEstados() {
    this.configuracaoService.carregarUFs().subscribe((r) => {
      this.estados = r;
      this.estados.unshift({ id: 0, nome: "Selecione um estado", sigla: "NA" });
    });
  }

  carregarCidades() {
    this.configuracaoService.carregarCidade(this.estado.id).subscribe((r) => {
      this.cidades = r;
      this.cidades.unshift({ id: 0, nome: "Selecione uma cidade" });
    });
  }

  carregarMarcas() {
    this.configuracaoService.carregarMarcas().subscribe((r) => {
      this.marcas = r;
      this.marcas.unshift({
        id: "NA",
        name: "Selecione uma marca",
      });
    });
  }

  carregarModelos() {
    this.configuracaoService.carregarModelos(this.marca.id).subscribe((r) => {
      this.modelos = r;
      this.modelos.unshift({ id: "NA", name: "Selecione um modelo" });
    });
  }

  async carregarUsuario() {
    const response = await api.get("/user");
    this.usuario = response.data;

    const responseAddress = await api.get("/address");
    console.log(responseAddress);
    this.endereco.logradouro = responseAddress.data.logradouro;
    this.endereco.complemento = responseAddress.data.complemento;
    this.endereco.uf = responseAddress.data.uf;
    this.estado.sigla = this.endereco.uf;
    this.endereco.cidade = responseAddress.data.cidade;
    this.cidade.nome = this.endereco.cidade;
  }

  async carregarVeiculo() {
    const response = await api.get("/vehicle");
    const {
      ano,
      ipva,
      manutencao,
      placa,
      quilometragem,
      marca,
      modelo,
    } = response.data;
    this.veiculo.ano = ano;
    this.veiculo.ipva = ipva;
    this.veiculo.manutencao = manutencao;
    this.veiculo.placa = placa;
    this.veiculo.quilometragem = quilometragem;
    this.veiculo.marca = marca;
    this.veiculo.modelo = modelo;
  }

  async alterarUsuario() {
    this.endereco.uf = this.estado.sigla;
    this.endereco.cidade = this.cidade.nome;

    const responseUser = await api.put("/user", this.usuario);
    const responseAddress = await api.put("/address", this.endereco);

    if (responseUser.status === 200 && responseAddress.status === 200) {
      Swal.fire({
        title: "Sucesso",
        text: "Sucesso ao atualizar os dados!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Erro",
        text: "Falha ao atualizar os dados!",
        icon: "error",
        showCancelButton: true,
      });
    }
  }

  async alterarVeiculo() {
    this.veiculo.marca = this.marca.id;
    this.veiculo.modelo = this.modelo.name;
    console.log(JSON.stringify(this.veiculo));
    const responseVehicle = await api.put("/vehicle", this.veiculo);
    if (responseVehicle.status === 200) {
      Swal.fire({
        title: "Sucesso",
        text: "Sucesso ao atualizar os dados!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Erro",
        text: "Falha ao atualizar os dados!",
        icon: "error",
        showCancelButton: true,
      });
    }
  }
}
