import { Component, OnInit } from "@angular/core";
import { Veiculo } from "./shared/veiculo.model";
import { Usuario } from "./shared/usuario.model";
import { ConfiguracaoService } from "./configuracao.service";

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
    this.carregarEstados();
    this.carregarMarcas();
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

  alterarUsuario() {
    this.usuario.estado = this.estado.sigla;
    this.usuario.cidade = this.cidade.nome;
    console.log(JSON.stringify(this.usuario));
  }

  alterarVeiculo() {
    this.veiculo.marca = this.marca.id;
    this.veiculo.modelo = this.modelo.name;
    console.log(JSON.stringify(this.veiculo));
  }
}
