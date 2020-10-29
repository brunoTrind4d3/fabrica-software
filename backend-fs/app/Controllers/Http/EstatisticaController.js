"use strict";
const { getMonth, getDayOfYear, format } = require("date-fns");
const Estatistica = use("App/Models/Estatistica");
const User = use("App/Models/User");
const Vehicle = use("App/Models/Vehicle");

class EstatisticaController {
  async redefinirMeta({ request, auth }) {
    const { goal } = request.only(["goal"]);
    const { id } = auth.user;

    const user = await User.find(id);

    user.goal = goal;

    await user.save();

    return user;
  }

  async lancamentoDiario({ request, auth, response }) {
    const {
      receitaObtida,
      quantidadeViagens,
      quilometrosRodados,
      valorCombustivel,
      consumoVeiculo,
      horasTrabalhadas,
    } = request.all();
    const user_id = auth.user.id;
    const est = await Estatistica.last(user_id);
    const novaData = new Date();
    if (est) {
      const { created_at } = est;
      if (getDayOfYear(created_at) === getDayOfYear(novaData)) {
        return response
          .status(400)
          .json({ error: "Lancamento diario ja realizado" });
      }
    }

    const receita = receitaObtida;
    const lancamento = await Estatistica.create({
      user_id,
      receita,
      valorCombustivel,
      consumoVeiculo,
      quantidadeViagens,
      quilometrosRodados,
      horasTrabalhadas,
    });

    return response.status(200).json(lancamento);
  }

  async montarGrafico({ params, response, auth }) {
    const { id } = auth.user;

    const lancamentos = await Estatistica.query().where("user_id", id).fetch();

    const mes = lancamentos.rows.filter((lancamento) => {
      return getMonth(lancamento.created_at) === getMonth(new Date());
    });

    const veiculo = await Vehicle.findBy("user_id", auth.user.id);
    const ipvaDia = new Number(veiculo.ipva) / 365;
    const manutencaoDia = new Number(veiculo.manutencao) / 30;

    const lucros = [];

    mes.map((m) => {
      lucros.push(new Number(m.receita));
    });

    const gastos = [];
    mes.map((m) => {
      gastos.push(
        (m.quilometrosRodados / m.consumoVeiculo) * m.valorCombustivel +
          ipvaDia +
          manutencaoDia
      );
    });

    const labels = [];
    mes.map((m) => {
      labels.push(format(m.created_at, "dd"));
    });

    const data = {
      labels,
      datasets: [
        {
          label: "Lucro",
          data: lucros,
          borderColor: "#149c2b",
        },
        {
          label: "Gasto",
          data: gastos,
          borderColor: "#7a0722",
        },
      ],
    };
    return { data };
  }

  async calcularLucro({ request, response, auth }) {
    const { id } = request.params;

    const lancamentos = await Estatistica.query().where("user_id", id).fetch();

    const mes = lancamentos.rows.filter((lancamento) => {
      return getMonth(lancamento.created_at) === getMonth(new Date());
    });

    const veiculo = await Vehicle.findBy("user_id", auth.user.id);
    const ipvaDia = parseInt(veiculo.ipva) / 365;
    const manutencaoDia = parseInt(veiculo.manutencao) / 30;
    const lucros = [];

    mes.map((m) => {
      lucros.push(parseInt(m.receita));
    });

    const gastos = [];
    mes.map((m) => {
      gastos.push(
        (m.quilometrosRodados / m.consumoVeiculo) * m.valorCombustivel +
          ipvaDia +
          manutencaoDia
      );
    });

    let lucroTotal = 0;
    lucros.map((l) => {
      lucroTotal += parseInt(l);
    });

    let gastoTotal = 0;
    gastos.map((g) => {
      gastoTotal += parseInt(g);
    });

    return lucroTotal - gastoTotal;
  }
}

module.exports = EstatisticaController;
