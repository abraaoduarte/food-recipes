const Model = require('./Model');

class Category extends Model {
  static get tableName() {
    return 'categories';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title'],

      properties: {
        id: {
          type: 'integer'
        },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 255
        },
      }
    };
  }

}

export default Category;