// Update with your config settings.

module.exports = {

	development: {
		client: 'postgresql',
		connection: {
			database: 'sistema1teste',
			user: 'postgres',
			password: '8188411',
			host: 'localhost',
			port: '5433'
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		pool: {
			min: 2,
			max: 10
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}

};
