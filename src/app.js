import Koa from 'koa';
import Knex from "knex";
import env from "./helpers/env";
import connection from "../knexfile";
import { Model } from "objection";


const app = new Koa();

const environment = env('NODE_ENV', 'development');
const knex = Knex(connection[environment]);
knex.migrate.latest([connection.knex]);
Model.knex(knex);


app.listen(3001, () => {
  console.log('iniciou!');
});

export default app;