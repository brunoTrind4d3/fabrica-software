"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressSchema extends Schema {
  up() {
    this.create("addresses", (table) => {
      table.increments();
      table.integer("user_id").references("users.id");
      table.string("cep").nullable();
      table.string("logradouro").nullable();
      table.string("complemento").nullable();
      table.string("uf").nullable();
      table.string("cidade").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("addresses");
  }
}

module.exports = AddressSchema;
