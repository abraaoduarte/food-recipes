import Router from 'koa-router';
import users from "../domains/users/ApiRoute";

const router = new Router({
  prefix: '/api',
});

router.use(users());

export default router;
