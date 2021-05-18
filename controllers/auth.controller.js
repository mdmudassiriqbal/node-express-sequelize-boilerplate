const {
	addUser,
	findUserByEmail,
} = require('../dao/auth.dao');
const { bycrptString, verifyBycrypt } = require('../utility/password');
const { handleSuccessResponse } = require('../helper/responseHandler');
const ApiError = require('../utility/ApiError');
const {
	INCORRECT_PASSWORD,
	INCORRECT_EMAIL,
} = require('../constant/failureMessage');
const {
	SUCCESS_SUGNUP,
} = require('../constant/sucessMessage');
const { getToken } = require('../utility/jwt');



const signup = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const hashedPassword = await bycrptString(password);
		const request = {
			name,
			email,
			password: hashedPassword,
		};
		const user = await addUser(request);
		handleSuccessResponse(res, user, SUCCESS_SUGNUP);
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await findUserByEmail(email);
		if (!user) {
			throw ApiError.unauthorized(INCORRECT_EMAIL);
		}
		const isPasswordCorrect = await verifyBycrypt(password, user.password);
		if (!isPasswordCorrect) {
			throw ApiError.unauthorized(INCORRECT_PASSWORD);
		}
		const tokenData = await getToken({
			id: user.id,
			name: user.name,
			email: user.email,
		});
		const data = {
			user,
			token: tokenData.token,
			expireIn: tokenData.expireTs,
		};
		handleSuccessResponse(res, data, '');
	} catch (err) {
		next(err);
	}
};

module.exports = {
	signup,
	login,
};
