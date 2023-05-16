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
        this.findPokeByName = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input) {
                    throw new BaseError_1.BaseError(412, "Necessário passar algum nome para procurar");
                }
                ;
                const nameTratado = input[0].toLocaleUpperCase() + input.substring(1);
                const queryResult = yield this.pokeDB.findPokeByName(nameTratado);
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
        this.getPokeById = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                let queryResult = yield this.pokeDB.getPokeById(input);
                if (!input) {
                    throw new BaseError_1.BaseError(412, "Necessário passar id");
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
        this.getAllPokes = (page) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!page) {
                    page = 1;
                }
                ;
                const queryResult = yield this.pokeDB.getAllPokes(page);
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
        this.alterPokes = (field, body, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!field) {
                    throw new BaseError_1.BaseError(412, "selecionar algo para alterar");
                }
                ;
                if (!body) {
                    throw new BaseError_1.BaseError(412, "Necessário passar informações para alterar");
                }
                ;
                if (!id) {
                    throw new BaseError_1.BaseError(412, "Necessário informar id para alterar");
                }
                ;
                yield this.pokeDB.alterPokes(field, body, id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.createPokes = (input) => __awaiter(this, void 0, void 0, function* () {
            const message = `Inclusão feita com sucesso!`;
            try {
                const { name, pokedex_number, img_name, generation, evolution_stage, evolved, family_id, cross_gen, type_1, type_2, weather_1, weather_2, stat_total, atk, def, sta, legendary, aquireable, spawns, regional, raidable, hatchable, shiny, nest, new_poke, not_gettable, future_evolve, cp_40, cp_39 } = input;
                const id = this.idGenerator.generate();
                const nameTratado = name[0].toLocaleUpperCase() + name.substring(1);
                const newPoke = {
                    id: id,
                    name: nameTratado,
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
                    throw new BaseError_1.BaseError(412, "Falta algum parâmetro, verifique novamente todos os campos inseridos");
                }
                yield this.pokeDB.createPokes(newPoke);
                return message;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.deletePoke = (input) => __awaiter(this, void 0, void 0, function* () {
            const message = `Deleção de ${input} feita com sucesso!`;
            try {
                yield this.pokeDB.deletePoke(input);
                if (!input) {
                    throw new BaseError_1.BaseError(412, "Necessário informar id para deletar");
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