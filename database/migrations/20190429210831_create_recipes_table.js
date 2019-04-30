
exports.up = function (knex, Promise) {
  return knex.schema.createTable('recipes', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.integer('user_id').unsigned().notNullable();
    table.integer('category_id').unsigned().notNullable();

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('category_id').references('id').inTable('categories');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes');
};
