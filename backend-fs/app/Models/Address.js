"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Address extends Model {
  user() {
    this.hasOne("App/Models/User");
  }
}

module.exports = Address;
