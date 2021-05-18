const bcrypt = require('bcrypt');
const bycrptString = async text => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(text, salt);
};

const verifyBycrypt = async (text, hash) => {
	return bcrypt.compare(text, hash);
};

module.exports = {
	bycrptString,
	verifyBycrypt,
};
