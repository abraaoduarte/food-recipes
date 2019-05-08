import passport from 'koa-passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from './models/User';

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategyHandler = model => (payload, done) => {
  const { id } = payload.sub;

  model
    .query()
    .throwIfNotFound()
    .findById(id)
    .then(async (user) => {
      return done(null, user);
    })
    .catch(done);
};

const AppStrategy = new Strategy(params, strategyHandler(User));
passport.use('api-jwt', AppStrategy);

const locker = {
  api: (options = {}) => passport.authenticate('api-jwt', {
    session: false,
    failWithError: true,
    ...options,
  }),
};

export { locker };