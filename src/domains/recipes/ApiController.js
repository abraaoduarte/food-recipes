import Recipe from '../../models/Recipe';

class RecipeApiController {
  static async index(ctx) {
    const recipes = await Recipe.query();

    ctx.body = recipes;
  }

  static async show(ctx) {
    const recipe = await Recipe.query().findById(ctx.params.id);

    if (!recipe) {
      return ctx.body = {
        message: 'Not found',
        data: []
      }
    }

    ctx.body = {
      message: 'success',
      data: recipe
    };
  }

  static async create(ctx) {
    const request = ctx.request.body;

    if (!request.title) {
      ctx.status = 422;
      return ctx.body = {
        message: 'O campo title é obrigatorio.',
      }
    }

    if (!request.description) {
      ctx.status = 422;
      return ctx.body = {
        message: 'O campo description é obrigatorio.',
      }
    }

    if (!request.user_id) {
      ctx.status = 422;
      return ctx.body = {
        message: 'O campo user é obrigatorio.',
      }
    }

    if (!request.category_id) {
      ctx.status = 422;
      return ctx.body = {
        message: 'O campo category é obrigatorio.',
      }
    }

    await Recipe.query()
      .insert({
        title: request.title,
        description: request.description,
        category_id: request.category_id,
        user_id: request.user_id,
        created_at: new Date(),
      })
      .then((recipe) => {
        return ctx.body = {
          message: 'success',
          data: recipe
        };
      })
      .catch((error) => {
        ctx.status = 500;
        return ctx.body = {
          message: 'error',
          data: error
        };
      });


  }

  static async update(ctx) {
    const request = ctx.request.body;

    let recipe = await Recipe.query()
      .where('id', ctx.params.id)
      .first()

    if (!recipe) {
      ctx.status = 404;
      return ctx.body = {
        message: 'Not found'
      };
    }

    recipe = await Recipe.query()
      .patchAndFetchById(
        recipe.id,
        {
          title: typeof request.title !== 'undefined' ? request.title : recipe.title,
          description: typeof request.description !== 'undefined' ? request.description : recipe.description,
          category_id: typeof request.category_id !== 'undefined' ? request.category_id : recipe.category_id,
          updated_at: new Date(),
        }
      ).then((recipe) => {
        return ctx.body = {
          message: 'success',
          data: recipe
        };
      })
      .catch((errors) => {
        ctx.status = 500;
        return ctx.body = {
          message: 'error',
          data: errors
        };
      });
  }

  static async delete(ctx) {
    await Recipe.query()
      .deleteById(ctx.params.id)
      .then(() => {
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

export default RecipeApiController;