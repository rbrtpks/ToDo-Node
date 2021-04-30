
module.exports = app => {
  app.route('/todo')
    .get(app.api.todo_list.getByStatus)
    .post(app.api.todo_list.save)

  app.route('/todo/give_me_chores')
    .get(app.api.todo_list.getMeChores)
}