
exports.up = function (knex, Promise) {
  return knex.schema.alterTable('todo_list', table => {
      table.integer('count_to_pending').defaultTo(0)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('todo_list', table => {
      table.dropColumn('count_to_pending')
  })
};
