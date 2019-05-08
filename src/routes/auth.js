import Router from 'koa-router';
import auth from "../domains/auth/ApiRoute";

const router = new Router({
  prefix: '/auth',
});

router.use(auth());

export default router;
