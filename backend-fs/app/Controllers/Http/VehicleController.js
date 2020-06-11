"use strict";
const Vehicle = use("App/Models/Vehicle");

class VehicleController {
  async index({ request, auth }) {
    const veiculo = await Vehicle.findBy("user_id", auth.user.id);
    return {
      ano: veiculo.year,
      ipva: veiculo.ipva,
      manutencao: veiculo.manutencao,
      placa: veiculo.carPlate,
      quilometragem: veiculo.kilometer,
      marca: veiculo.brand,
      modelo: veiculo.model,
    };
  }

  async update({ request, auth }) {
    const {
      ano,
      ipva,
      manutencao,
      placa,
      quilometragem,
      marca,
      modelo,
    } = request.all();
    const veiculo = await Vehicle.findBy("user_id", auth.user.id);

    if (veiculo) {
      veiculo.year = parseInt(ano);
      veiculo.ipva = parseInt(ipva);
      veiculo.manutencao = parseInt(manutencao);
      veiculo.carPlate = placa;
      veiculo.kilometer = parseInt(quilometragem);
      veiculo.brand = marca;
      veiculo.model = modelo;

      await veiculo.save();
    } else {
      const veiculo = await Vehicle.create({
        user_id: auth.user.id,
        year: parseInt(ano),
        ipva: parseInt(ipva),
        manutencao: parseInt(manutencao),
        carPlate: placa,
        kilometer: parseInt(quilometragem),
        brand: marca,
        model: modelo,
      });
      return { veiculo };
    }
    const newVeiculo = await Vehicle.findBy("user_id", auth.user.id);

    return { newVeiculo };
  }
}

module.exports = VehicleController;
