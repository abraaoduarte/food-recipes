const Model = require('./Model');
import User from "./User";
import Category from "./Category";

class Recipe extends Model {
  static get tableName() {
    return 'recipes';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'description', 'category_id', 'user_id'],

      properties: {
        id: {
          type: 'integer'
        },
        category_id: {
          type: 'integer'
        },
        user_id: {
          type: 'integer'
        },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 255
        },
        description: {
          type: 'string',
          minLength: 1,
          maxLength: 255
        },
      }
    };
  }

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: Category,
      join: {
        from: 'recipes.category_id',
        to: 'categories.id'
      }
    }
  }

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'recipes.user_id',
        to: 'users.id'
      }
    }
  }

}

export default Recipe;