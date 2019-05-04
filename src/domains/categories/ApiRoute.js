import Router from 'koa-router';
import Category from "./ApiController";


const router = new Router({
  prefix: '/categories',
});

router.get('/', Category.index);
router.post('/', Category.create);
router.put('/:id/update', Category.update);
router.delete('/:id/delete', Category.delete);
router.get('/:id', Category.show);

export default () => router.routes();
