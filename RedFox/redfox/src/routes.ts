import express from "express";
import { PokemonController } from "./Controller/PokemonController";
import { PokemonBusiness } from "./Business/PokemonBusiness";
import { PokemonDataBase } from "./Database/PokemonDataBase";
import { IdGenerator } from "./Services/IdGenerator";

export const pokeRouter = express.Router();

const pokeBusiness = new PokemonBusiness(
    new PokemonDataBase,
    new IdGenerator
)

const pokeController = new PokemonController(pokeBusiness);

pokeRouter.get("/search-name", pokeController.pokeName);
pokeRouter.get("/search-id/:id", pokeController.pokeId);
pokeRouter.get("/search-all", pokeController.pokeAll);
pokeRouter.patch("/edit/:id", pokeController.editPoke);
pokeRouter.post("/create", pokeController.newPoke);
pokeRouter.delete("/delete/:id", pokeController.deletePoke);

