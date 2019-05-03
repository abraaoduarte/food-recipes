import Router from 'koa-router';
import User from "./ApiController";


const router = new Router({
  prefix: '/users',
});

router.get('/', User.index);

export default () => router.routes();
