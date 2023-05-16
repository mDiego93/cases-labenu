
import { BaseError } from "../Error/BaseError";
import { BaseDatabase } from "./BaseDataBase";
import { readCSVFile } from "../Local/Reader";
const filePath = "../local/Pokemon";


export class PokemonDataBase extends BaseDatabase {

    
    private static TABLE_NAME = "Pokemon";

    public teste = readCSVFile(filePath)
    .then((data) => {
      console.log(data); // This will log the parsed data as an array of objects
    })
    .catch((error) => {
      console.error(error); // This will log any errors that occurred during the parsing process
    });

    public pokeName = async (input: string): Promise<any> => {
        try {

            const result = await this.getConnection()
                .select("*")
                .where({ name: input })
                .into(PokemonDataBase.TABLE_NAME);

            return result[0];

        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    }

    public pokeId = async (input: string): Promise<any> => {
        try {
            const result = await this.getConnection()
                .select("*")
                .where({ id: input })
                .into(PokemonDataBase.TABLE_NAME);
            return result[0];
        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    }

    public pokeAll = async (page: number): Promise<any> => {
        try {

            let size = 10;
            let offset = size * (page - 1)

            const result = await this.getConnection()
                .select("*")
                .limit(size)
                .offset(offset)
                .into(PokemonDataBase.TABLE_NAME)

            return result;
        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    }

    public editPoke = async (field: string, body: any, id: string): Promise<any> => {
        try {
            const message = "Pokemon editado"

            await this.getConnection().raw(`
            UPDATE Pokemon 
            SET ${field} = ${body} WHERE id = ${id}; 
            `)

            return message
        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    };

    public createPoke = async (input: any): Promise<any> => {
        try {

            await this.getConnection()
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

        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    }

    public deletePoke = async (input: any): Promise<any> => {
        try {

            await this.getConnection()
                .delete("*")
                .where({ id: input })
                .into(PokemonDataBase.TABLE_NAME);

        } catch (error) {
            if (error instanceof Error) {
                throw new BaseError(400, error.message);
            }
        }
    }
}
