import moment from 'moment';
import Category from '../../models/Category';

class CategoryApiController {
  static async index(ctx) {
    const categories = await Category.query();

    ctx.body = categories;
  }

  static async show(ctx) {
    const category = await Category.query().findById(ctx.params.id);

    if (!category) {
      return ctx.body = {
        message: 'Not found',
        data: []
      }
    }

    ctx.body = {
      message: 'success',
      data: category
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

    const category = await Category.query()
      .insert({
        title: request.title,
        created_at: moment().format('YYYY-MM-DD h:mm:ss'),
      });

    return ctx.body = {
      message: 'success',
      data: category
    };
  }

  static async update(ctx) {
    const request = ctx.request.body;

    let category = await Category.query()
      .where('id', ctx.params.id)
      .first()

    if (!category) {
      ctx.status = 404;
      return ctx.body = {
        message: 'Not found'
      };
    }

    category = await Category.query()
      .patchAndFetchById(
        category.id,
        {
          title: typeof request.title !== 'undefined' ? request.title : category.title,
        }
      );

    return ctx.body = {
      message: 'success',
      data: category
    };
  }

  static async delete(ctx) {
    await Category.query()
      .deleteById(ctx.params.id)
      .then((category) => {
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

export default CategoryApiController;