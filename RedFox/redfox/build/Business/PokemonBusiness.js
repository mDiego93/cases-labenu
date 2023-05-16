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
exports.PokemonBusiness = void 0;
const BaseError_1 = require("../Error/BaseError");
class PokemonBusiness {
    constructor(pokeDB, idGenerator) {
        this.pokeDB = pokeDB;
        this.idGenerator = idGenerator;
        this.selectPokeName = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input) {
                    throw new BaseError_1.BaseError(412, "Nome inválido");
                }
                ;
                const normalName = input[0].toLocaleUpperCase() + input.substring(1);
                const queryResult = yield this.pokeDB.pokeName(normalName);
                console.log("query no business", queryResult);
                if (!queryResult) {
                    throw new BaseError_1.BaseError(400, "Não foi encontrado nenhum pokemon");
                }
                ;
                return queryResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.selectPokeId = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                let queryResult = yield this.pokeDB.pokeId(input);
                if (!input) {
                    throw new BaseError_1.BaseError(412, "Id inválido");
                }
                ;
                if (!queryResult) {
                    throw new BaseError_1.BaseError(400, "Não foi encontrado nenhum pokemon");
                }
                ;
                return queryResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.selectPokeAll = (page) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!page) {
                    page = 1;
                }
                ;
                const queryResult = yield this.pokeDB.pokeAll(page);
                console.log("page no business", page);
                if (!queryResult) {
                    throw new BaseError_1.BaseError(400, "Não foi encontrado nenhum pokemon");
                }
                ;
                return queryResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.updatePoke = (field, body, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!field) {
                    throw new BaseError_1.BaseError(412, "Campo inválido");
                }
                ;
                if (!body) {
                    throw new BaseError_1.BaseError(412, "Body inválido");
                }
                ;
                if (!id) {
                    throw new BaseError_1.BaseError(412, "Id inválido");
                }
                ;
                yield this.pokeDB.editPoke(field, body, id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.insertPoke = (input) => __awaiter(this, void 0, void 0, function* () {
            const message = `Pokemon adicionado`;
            try {
                const { name, pokedex_number, img_name, generation, evolution_stage, evolved, family_id, cross_gen, type_1, type_2, weather_1, weather_2, stat_total, atk, def, sta, legendary, aquireable, spawns, regional, raidable, hatchable, shiny, nest, new_poke, not_gettable, future_evolve, cp_40, cp_39 } = input;
                const id = this.idGenerator.generate();
                const normalName = name[0].toLocaleUpperCase() + name.substring(1);
                const newPoke = {
                    id: id,
                    name: normalName,
                    pokedex_number,
                    img_name,
                    generation,
                    evolution_stage,
                    evolved,
                    family_id,
                    cross_gen,
                    type_1,
                    type_2,
                    weather_1,
                    weather_2,
                    stat_total,
                    atk,
                    def,
                    sta,
                    legendary,
                    aquireable,
                    spawns,
                    regional,
                    raidable,
                    hatchable,
                    shiny,
                    nest,
                    new_poke,
                    not_gettable,
                    future_evolve,
                    cp_40,
                    cp_39
                };
                if (!name || !pokedex_number || !img_name || !generation || !evolution_stage || !evolved || !family_id
                    || !cross_gen || !type_1 || !type_2 || !weather_1 || !weather_2 || !stat_total || !atk || !def || !sta
                    || !legendary || !aquireable || !spawns || !regional || !raidable || !hatchable || !shiny || !nest
                    || !new_poke || !not_gettable || !future_evolve || !cp_40 || !cp_39) {
                    throw new BaseError_1.BaseError(412, "Algum campo inválido, verifique");
                }
                yield this.pokeDB.createPoke(newPoke);
                return message;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.deletePoke = (input) => __awaiter(this, void 0, void 0, function* () {
            const message = `${input} excluído`;
            try {
                yield this.pokeDB.deletePoke(input);
                if (!input) {
                    throw new BaseError_1.BaseError(412, "Id inválido");
                }
                ;
                return message;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
    }
}
exports.PokemonBusiness = PokemonBusiness;
//# sourceMappingURL=PokemonBusiness.js.map