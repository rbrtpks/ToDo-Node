const { v4: uuidv4 } = require('uuid');
const axios = require('axios')

module.exports = app => {
  const { existsOrError } = app.api.validation

  const getByStatus = async (req, res) => {
    await app.db('todo_list')
      .select()
      .where({ 'status': req.query.params })
      .then(todo_list => res.json(todo_list))
      .catch(err => res.status(500).send(err))
  }

  const save = async (req, res) => {
    const todo = { ...req.body }

    if (req.params.id) todo.id = req.params.id

    try {
      existsOrError(todo.description, 'Descrição não informada')
      existsOrError(todo.responsible, 'Responsável não informado')
      existsOrError(todo.email, 'E-mail não informado')
      existsOrError(todo.status, 'Status não informada')

    } catch (e) {
      return res.status(400).send(e);
    }

    try {
      if (todo.id) { // PUT
        await app.db('todo_list')
          .update({ ...todo })
          .where({ id: todo.id })

        const todoUpdate = await app.db('todo_list')
          .where({ id: todo.id })
          .first()

        return res.status(200).json(todoUpdate);

      } else { // POST
        todo.id = uuidv4()
        todo.created_at = new Date()

        const result = await app.db('todo_list')
          .insert(todo)

        return res.status(200).json(result)
      }
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

  const getMeChores = async (req, res) => {
    try {
      let list = []
      await axios.get('https://cat-fact.herokuapp.com/facts')
        .then((response) => {
          const arr = response.data;

          for (var x = 0; x < 3; x++) {
            const todo = {
              'description': arr[Math.floor(Math.random() * arr.length)].text,
              'id': uuidv4(),
              'created_at': new Date(),
              'responsible': 'Eu',
              'count_to_pending': 0,
              'email': 'eu@me.com',
              'status': 'pending'
            }
            list.push(todo)
          }
        })

      await Promise.all(list.map(async (element) => {
        await app.db('todo_list')
          .insert(element)
      }))

      res.status(200).send('Feito!')
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

  return { getByStatus, save, getMeChores }
}