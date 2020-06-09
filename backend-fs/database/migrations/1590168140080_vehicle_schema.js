"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class VehicleSchema extends Schema {
  up() {
    this.create("vehicles", (table) => {
      table.increments();
      table.integer("user_id").references("users.id");
      table.integer("brand").notNullable();
      table.string("model").notNullable();
      table.string("carPlate").notNullable().unique();
      table.bigInteger("kilometer").notNullable();
      table.integer("year").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("vehicles");
  }
}

module.exports = VehicleSchema;
