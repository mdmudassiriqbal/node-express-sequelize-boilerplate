const User = require('../database/db').user;
//sequilise
const addUser = async data => User.create(data);

const findUserByEmail = async email => User.findOne({ where: { email } });

const updatePasswordByEmail = async (password, email) =>
	User.update({ password }, { where: { email } });

	const updateVerifyUserEmail = async email =>
	User.update({ is_email_verified: true }, { where: { email } });

module.exports = {
	addUser,
	findUserByEmail,
	updatePasswordByEmail,
	updateVerifyUserEmail,
};
