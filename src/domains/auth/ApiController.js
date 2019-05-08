import bcrypt from 'bcrypt';
import User from '../../models/User';

import makeUserResponse from './utils/make-user-response';

class AuthApiController {
  static async login(ctx) {
    const { body } = ctx.request;

    if (!body.email) {
      ctx.status = 401;
      return ctx.body = "E-mail é obrigatório"
    }

    if (!body.password) {
      ctx.status = 401;
      return ctx.body = "Senha é obrigatório"
    }

    const user = await User.query()
      .where('email', body.email)
      .first();

    if (!(await bcrypt.compare(body.password, user.password))) {
      ctx.status = 401;
      return ctx.body = {
        message: 'Senha inválida',
      };
    }

    ctx.status = 200;
    return ctx.body = makeUserResponse(user);

  }
}

export default AuthApiController;