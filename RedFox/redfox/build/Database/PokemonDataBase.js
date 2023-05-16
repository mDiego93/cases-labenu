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
exports.PokemonDataBase = void 0;
const BaseError_1 = require("../Error/BaseError");
const BaseDataBase_1 = require("./BaseDataBase");
const Reader_1 = require("../Local/Reader");
const filePath = "../local/Pokemon";
class PokemonDataBase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.teste = (0, Reader_1.readCSVFile)(filePath)
            .then((data) => {
            console.log(data);
        })
            .catch((error) => {
            console.error(error);
        });
        this.pokeName = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("*")
                    .where({ name: input })
                    .into(PokemonDataBase.TABLE_NAME);
                return result[0];
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.pokeId = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("*")
                    .where({ id: input })
                    .into(PokemonDataBase.TABLE_NAME);
                return result[0];
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.pokeAll = (page) => __awaiter(this, void 0, void 0, function* () {
            try {
                let size = 10;
                let offset = size * (page - 1);
                const result = yield this.getConnection()
                    .select("*")
                    .limit(size)
                    .offset(offset)
                    .into(PokemonDataBase.TABLE_NAME);
                return result;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.editPoke = (field, body, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const message = "Pokemon editado";
                yield this.getConnection().raw(`
            UPDATE Pokemon 
            SET ${field} = ${body} WHERE id = ${id}; 
            `);
                return message;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.createPoke = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: input.id,
                    name: input.name,
                    pokedex_number: input.pokedex_number,
                    img_name: input.img_name,
                    generation: input.generation,
                    evolution_stage: input.evolution_stage,
                    evolved: input.evolved,
                    family_id: input.family_id,
                    cross_gen: input.cross_gen,
                    type_1: input.type_1,
                    type_2: input.type_2,
                    weather_1: input.weather_1,
                    weather_2: input.weather_2,
                    stat_total: input.stat_total,
                    atk: input.atk,
                    def: input.def,
                    sta: input.sta,
                    legendary: input.legendary,
                    aquireable: input.aquireable,
                    spawns: input.spawns,
                    regional: input.regional,
                    raidable: input.raidable,
                    hatchable: input.hatchable,
                    shiny: input.shiny,
                    nest: input.nest,
                    new_poke: input.new_poke,
                    not_gettable: input.not_gettable,
                    future_evolve: input.future_evolve,
                    cp_40: input.cp_40,
                    cp_39: input.cp_39
                })
                    .into(PokemonDataBase.TABLE_NAME);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
        this.deletePoke = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .delete("*")
                    .where({ id: input })
                    .into(PokemonDataBase.TABLE_NAME);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new BaseError_1.BaseError(400, error.message);
                }
            }
        });
    }
}
PokemonDataBase.TABLE_NAME = "Pokemon";
exports.PokemonDataBase = PokemonDataBase;
//# sourceMappingURL=PokemonDataBase.js.map