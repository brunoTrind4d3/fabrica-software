"use strict";
const User = use("App/Models/User");
const Address = use("App/Models/Address");

class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);
    return user;
  }

  async index({ request, auth }) {
    const user = await User.findBy("id", auth.user.id);
    return user;
  }

  async update({ request, auth }) {
    const { email, username, birthDate, mobilePhone, cpf } = request.all();
    const user = await User.findBy("id", auth.user.id);
    user.email = email;
    user.username = username;
    user.birthDate = birthDate;
    user.mobilePhone = mobilePhone;
    user.cpf = cpf;
    await user.save();

    const newUser = await User.findBy("id", auth.user.id);
    

    return { newUser };
  }
}

module.exports = UserController;
