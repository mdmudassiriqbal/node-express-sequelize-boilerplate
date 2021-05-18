const { USER_MODEL_NAME } = require('../../constant/dbModelName');
module.exports = (sequelize, DataTypes) => {
	const schema = {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: DataTypes.STRING
	};
	const paranoidJson = {
		paranoid: true,
		indexes: [
			{
				unique: true,
				fields: ['email'],
			},
		],
	};
	return sequelize.define(USER_MODEL_NAME, schema, paranoidJson);
};
