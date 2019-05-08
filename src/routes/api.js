import Router from 'koa-router';
import users from "../domains/users/ApiRoute";
import categories from "../domains/categories/ApiRoute";
import recipes from "../domains/recipes/ApiRoute";
import { locker } from '../auth';

const router = new Router({
  prefix: '/api',
});

router.use(locker.api());
router.use(users());
router.use(recipes());
router.use(categories());

export default router;
