import Koa from 'koa';
import Knex from "knex";
import logger from "koa-morgan";
import bodyParser from "koa-bodyparser";
import Notifier from "node-notifier";
import env from "./helpers/env";
import connection from "../knexfile";
import { Model } from "objection";

import api from "./routes/api";

const app = new Koa();

const environment = env('NODE_ENV', 'development');
const knex = Knex(connection[environment]);
knex.migrate.latest([connection.knex]);
Model.knex(knex);

app.use(logger('tiny'));
app.use(bodyParser());
app.use(api());

app.listen(3001, () => {
  console.log("Server listening on port: 127.0.0.1:3001");
  Notifier.notify({
    title: "Food Recipes",
    message: "Server listening on port: 127.0.0.1:3001"
  });

});

export default app;