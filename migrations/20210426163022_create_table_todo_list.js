
exports.up = function (knex, Promise) {
  return knex.schema.createTable('todo_list', table => {
    table.uuid('id').primary()
    table.string('description').notNull()
    table.string('responsible').notNull()
    table.string('email').notNull()
    table.string('status').notNull()
    table.timestamp('created_at')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('todo_list')
};
