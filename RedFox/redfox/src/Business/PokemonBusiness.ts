import { PokemonDataBase } from "../Database/PokemonDataBase";
import { BaseError } from "../Error/BaseError";
import { PokemonDTO } from "../Types/PokemonModel";
import { IdGenerator } from "../Services/IdGenerator";

export class PokemonBusiness {
    constructor(
        private pokeDB: PokemonDataBase,
        private idGenerator: IdGenerator
    ) { }

    

    public selectPokeName = async (input: string): Promise<any> => {
        try {


            if (!input) {
                throw new BaseError(412, "Nome inválido");
            };

            const normalName: string = input[0].toLocaleUpperCase() + input.substring(1)

            const queryResult: any = await this.pokeDB.pokeName(normalName)

            console.log("query no business", queryResult)


            if (!queryResult) {
                throw new BaseError(400, "Não foi encontrado nenhum pokemon")
            };

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    };

    public selectPokeId = async (input: string): Promise<any> => {
        try {

            let queryResult: any = await this.pokeDB.pokeId(input)

            if (!input) {
                throw new BaseError(412, "Id inválido");
            };


            if (!queryResult) {
                throw new BaseError(400, "Não foi encontrado nenhum pokemon")
            };

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    };

    public selectPokeAll = async (page: number): Promise<any> => {
        try {

            if (!page) {
                page = 1
            };

            const queryResult: any = await this.pokeDB.pokeAll(page)

            console.log("page no business", page)

            if (!queryResult) {
                throw new BaseError(400, "Não foi encontrado nenhum pokemon")
            };

            return queryResult

        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    };

    public updatePoke = async (field: string, body: any, id: string): Promise<void> => {

        try {

            if (!field) {
                throw new BaseError(412, "Campo inválido")
            };

            if (!body) {
                throw new BaseError(412, "Body inválido")
            };

            if (!id) {
                throw new BaseError(412, "Id inválido")
            };

            await this.pokeDB.editPoke(field, body, id)


        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    };

    public insertPoke = async (input: any): Promise<any> => {

        const message = `Pokemon adicionado`

        try {

            const { name, pokedex_number, img_name, generation, evolution_stage, evolved, family_id, cross_gen,
                type_1, type_2, weather_1, weather_2, stat_total, atk, def, sta, legendary, aquireable, spawns,
                regional, raidable, hatchable, shiny, nest, new_poke, not_gettable, future_evolve, cp_40,
                cp_39 } = input

            const id: string = this.idGenerator.generate();
            const normalName: string = name[0].toLocaleUpperCase() + name.substring(1)

            const newPoke: PokemonDTO = {
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
                throw new BaseError(412, "Algum campo inválido, verifique");
            }

            await this.pokeDB.createPoke(newPoke);

            return message

        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    };

    public deletePoke = async (input: any): Promise<any> => {
        const message = `${input} excluído`

        try {
            await this.pokeDB.deletePoke(input);

            if (!input) {
                throw new BaseError(412, "Id inválido")
            };

            return message
        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }

    };
}