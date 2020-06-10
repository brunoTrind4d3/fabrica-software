"use strict";
const Address = use("App/Models/Address");

class AddressController {
  async index({ request, auth }) {
    const address = await Address.findBy("user_id", auth.user.id);
    return address;
  }

  async update({ request, auth }) {
    const { logradouro, complemento, uf, cidade } = request.all();
    const address = await Address.findBy("user_id", auth.user.id);
    if (!address) {
      const create = await Address.create({
        logradouro,
        complemento,
        uf,
        cidade,
        user_id: auth.user.id,
      });
      return create;
    }
    address.logradouro = logradouro;
    address.complemento = complemento;
    address.uf = uf;
    address.cidade = cidade;
    await address.save();
    const newAddress = await Address.findBy("user_id", auth.user.id);

    return { newAddress };
  }
}

module.exports = AddressController;
