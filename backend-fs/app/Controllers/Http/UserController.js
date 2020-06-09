"use strict";
const User = use("App/Models/User");
class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);
    return user;
  }

  async update({ request, auth }) {
    const { email, username } = request.all();
    const user = await User.findBy("id", auth.user.id);
    user.email = email;
    user.username = username;
    await user.save();

    const newUser = await User.findBy("id", auth.user.id);
    const { id } = newUser;
    return { id, email, username };
  }
}

module.exports = UserController;
