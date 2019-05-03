import moment from 'moment';
import bcrypt from 'bcrypt';
import User from '../../models/User';

class UserApiController {
  static async index(ctx) {
    const users = await User.query();

    ctx.status = 200;
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

    ctx.status = 200;
    ctx.body = {
      message: 'success',
      data: user
    };


  }
}

export default UserApiController;