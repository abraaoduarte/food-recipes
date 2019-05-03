const Model = require('./Model');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],

      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 255
        },
        password: {
          type: 'string',
          minLength: 4,
          maxLength: 255
        },
      }
    };
  }

}

export default User;