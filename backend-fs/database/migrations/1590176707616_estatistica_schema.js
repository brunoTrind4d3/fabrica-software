"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EstatisticaSchema extends Schema {
  up() {
    this.create("estatisticas", (table) => {
      table.increments();
      table.integer("user_id").references("users.id");
      table.decimal("receita", 10, 2).notNullable();
      table.decimal("valorCombustivel", 10, 2).notNullable();
      table.decimal("consumoVeiculo", 10, 2).notNullable();
      table.integer("quantidadeViagens").notNullable();
      table.integer("quilometrosRodados").notNullable();
      table.integer("horasTrabalhadas").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("estatisticas");
  }
}

module.exports = EstatisticaSchema;
