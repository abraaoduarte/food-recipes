import moment from 'moment';
import bcrypt from 'bcrypt';
import User from '../../models/User';

class UserApiController {
  static async index(ctx) {
    const users = await User.query();

    ctx.status = 200;
    ctx.body = users;
  }
}

export default UserApiController;