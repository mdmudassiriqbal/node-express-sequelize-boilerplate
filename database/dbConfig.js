require('dotenv').config();

const env = process.env;

module.exports = {
	db_host: env.DB_HOST || 'localhost',
	db_user_name: env.DB_USERNAME,
	db_password: env.DB_PASSWORD,
	db_name: env.DB_NAME,
	db_dialect: env.DB_DIALECT || 'postgres',
	db_pool: {
		max: env.DB_POOL_MAX | 5,
		min: env.DB_POOL_MIN | 0,
		acquire: env.DB_POOL_ACQUIRE | 0,
		idle: env.DB_POOL_IDLE | 0,
	},
	db_port: env.DB_PORT | 5432,
};
