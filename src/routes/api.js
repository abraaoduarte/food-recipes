import Router from 'koa-router';
import compose from 'koa-compose';
import users from "../domains/users/ApiRoute";

const router = new Router({
  prefix: '/api',
});


router.use(users());

const allowedMethods = router.allowedMethods({
  throw: true,
});

export default () => compose([
  users(),
  allowedMethods,
]);