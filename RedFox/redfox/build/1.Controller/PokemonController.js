"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonController = void 0;
const BaseError_1 = require("../Error/BaseError");
class PokemonController {
    constructor(pokeBusiness) {
        this.pokeBusiness = pokeBusiness;
        this.findPokeByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const name = String(req.query.name);
                const pokemonList = yield this.pokeBusiness.findPokeByName(name);
                res.status(200).send(pokemonList);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
            ;
        });
        this.getPokeById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const pokemonList = yield this.pokeBusiness.getPokeById(id);
                res.status(200).send(pokemonList);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
            ;
        });
        this.getAllPokes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.page);
                const pokemonList = yield this.pokeBusiness.getAllPokes(page);
                res.status(200).send(pokemonList);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
            ;
        });
        this.alterPokes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { field, body } = req.body;
                const id = String(req.params.id);
                yield this.pokeBusiness.alterPokes(field, body, id);
                res.status(200).send(`o campo "${field}" foi alterado com sucesso!`);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
            ;
        });
        this.createPokes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, pokedex_number, img_name, generation, evolution_stage, evolved, family_id, cross_gen, type_1, type_2, weather_1, weather_2, stat_total, atk, def, sta, legendary, aquireable, spawns, regional, raidable, hatchable, shiny, nest, new_poke, not_gettable, future_evolve, cp_40, cp_39 } = req.body;
                const input = {
                    name, pokedex_number, img_name, generation, evolution_stage, evolved, family_id, cross_gen,
                    type_1, type_2, weather_1, weather_2, stat_total, atk, def, sta, legendary, aquireable, spawns,
                    regional, raidable, hatchable, shiny, nest, new_poke, not_gettable, future_evolve, cp_40,
                    cp_39
                };
                yield this.pokeBusiness.createPokes(input);
                res.status(200).send(`Pokemón criado com sucesso!`);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
            ;
        });
        this.deletePoke = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.pokeBusiness.deletePoke(id);
                res.status(200).send(`Pokemon deletado com sucesso!`);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
            ;
        });
    }
}
exports.PokemonController = PokemonController;
;
//# sourceMappingURL=PokemonController.js.map