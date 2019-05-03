import moment from 'moment';
import bcrypt from 'bcrypt';
import User from '../../models/User';

class UserApiController {
  static async index(ctx) {
    const users = await User.query();

    ctx.body = users;
  }

  static async show(ctx) {
    const user = await User.query().findById(ctx.params.id);

    if (!user) {
      return ctx.body = {
        message: 'Not found',
        data: []
      }
    }

    ctx.body = {
      message: 'success',
      data: user
    };
  }

  static async create(ctx) {
    const request = ctx.request.body;

    if (!request.email) {
      ctx.status = 422;
      return ctx.body = {
        message: 'O campo e-mail é obrigatorio.',
      }
    }

    if (!request.password) {
      ctx.status = 422;
      return ctx.body = {
        message: 'O campo password é obrigatorio.',
      }
    }

    if (!request.name) {
      ctx.status = 422;
      return ctx.body = {
        message: 'O campo name é obrigatorio.',
      }
    }

    let user = await User
      .query()
      .where({ email: request.email })
      .first();

    if (user) {
      ctx.status = 422;
      return ctx.body = {
        message: 'E-mail já cadastrado.',
      }
    }

    const password = await bcrypt.hash(request.password, 10);

    user = await User.query()
      .insert({
        name: request.name,
        email: request.email,
        password: password,
        active: true,
        created_at: moment().format('YYYY-MM-DD h:mm:ss'),
      });

    return ctx.body = {
      message: 'success',
      data: user
    };
  }

  static async update(ctx) {
    const request = ctx.request.body;

    let user = await User.query()
      .where('id', ctx.params.id)
      .first()

    if (!user) {
      ctx.status = 404;
      return ctx.body = {
        message: 'Not found'
      };
    }

    let password = typeof request.password !== 'undefined' ? request.password : user.password;

    password = await bcrypt.hash(request.password, 10);

    user = await User.query()
      .patchAndFetchById(
        user.id,
        {
          name: typeof request.name !== 'undefined' ? request.name : user.name,
          email: typeof request.email !== 'undefined' ? request.email : user.email,
          password: password,
        }
      );

    return ctx.body = {
      message: 'success',
      data: user
    };
  }

  static async delete(ctx) {
    await User.query()
      .deleteById(ctx.params.id)
      .then((user) => {
        return ctx.body = {
          message: 'Success'
        };
      })
      .catch((error) => {
        ctx.status = 500;
        return ctx.body = {
          message: error
        };
      });
  }
}

export default UserApiController;