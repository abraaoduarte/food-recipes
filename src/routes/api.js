import Router from 'koa-router';
import users from "../domains/users/ApiRoute";
import categories from "../domains/categories/ApiRoute";
import recipes from "../domains/recipes/ApiRoute";

const router = new Router({
  prefix: '/api',
});

router.use(users());
router.use(recipes());
router.use(categories());

export default router;
