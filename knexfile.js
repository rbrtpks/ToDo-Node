require('dotenv').config();

module.exports = {
	client: 'postgresql',
	connection: {
    host: 'postgres_todo',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    charset: 'utf8'
  },
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};
