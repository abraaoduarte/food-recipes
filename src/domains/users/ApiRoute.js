import Router from 'koa-router';
import User from "./ApiController";


const router = new Router({
  prefix: '/users',
});

router.get('/', User.index);
router.post('/', User.create);
router.put('/:id/update', User.update);
router.delete('/:id/delete', User.delete);
router.get('/:id', User.show);

export default () => router.routes();
