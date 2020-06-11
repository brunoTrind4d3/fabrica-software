"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("authenticate", "AuthController.authenticate");
Route.post("register", "UserController.store");

Route.get("user", "UserController.index").middleware(["auth"]);
Route.put("user", "UserController.update").middleware(["auth"]);

Route.put("address", "AddressController.update").middleware(["auth"]);
Route.get("address", "AddressController.index").middleware(["auth"]);

Route.put("vehicle", "VehicleController.update").middleware(["auth"]);
Route.get("vehicle", "VehicleController.index").middleware(["auth"]);

Route.put("estatistica", "EstatisticaController.redefinirMeta").middleware([
  "auth",
]);
Route.post("estatistica", "EstatisticaController.lancamentoDiario").middleware([
  "auth",
]);
Route.get("estatistica", "EstatisticaController.montarGrafico").middleware([
  "auth",
]);

Route.get("estatistica/:id", "EstatisticaController.calcularLucro").middleware([
  "auth",
]);
