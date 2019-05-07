import Router from 'koa-router';
import Auth from "./ApiController";

const router = new Router();

router.post('/login', Auth.login);

export default () => router.routes();


