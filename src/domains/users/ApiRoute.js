import Router from 'koa-router';
import User from "./ApiController";


const router = new Router({
  prefix: '/users',
});

router.get('/', User.index);
router.get('/:id', User.show);

export default () => router.routes();
