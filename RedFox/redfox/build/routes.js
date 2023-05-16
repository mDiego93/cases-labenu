"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeRouter = void 0;
const express_1 = __importDefault(require("express"));
const PokemonController_1 = require("./Controller/PokemonController");
const PokemonBusiness_1 = require("./Business/PokemonBusiness");
const PokemonDataBase_1 = require("./Database/PokemonDataBase");
const IdGenerator_1 = require("./Services/IdGenerator");
exports.pokeRouter = express_1.default.Router();
const pokeBusiness = new PokemonBusiness_1.PokemonBusiness(new PokemonDataBase_1.PokemonDataBase, new IdGenerator_1.IdGenerator);
const pokeController = new PokemonController_1.PokemonController(pokeBusiness);
exports.pokeRouter.get("/search-name", pokeController.pokeName);
exports.pokeRouter.get("/search-id/:id", pokeController.pokeId);
exports.pokeRouter.get("/search-all", pokeController.pokeAll);
exports.pokeRouter.patch("/edit/:id", pokeController.editPoke);
exports.pokeRouter.post("/create", pokeController.newPoke);
exports.pokeRouter.delete("/delete/:id", pokeController.deletePoke);
//# sourceMappingURL=routes.js.map