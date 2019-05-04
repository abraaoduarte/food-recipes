import Router from 'koa-router';
import Recipe from "./ApiController";


const router = new Router({
  prefix: '/recipes',
});

router.get('/', Recipe.index);
router.post('/', Recipe.create);
router.put('/:id/update', Recipe.update);
router.delete('/:id/delete', Recipe.delete);
router.get('/:id', Recipe.show);

export default () => router.routes();
