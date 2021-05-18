const { verifyToken } = require('../utility/jwt');
const apiError = require('../utility/ApiError');
const { ADMIN_ROLE } = require('../constant/role');

const getVerifyToken = async req => {
	const auth = req.headers['authorization'];
	if (!auth || (auth && auth.indexOf('Bearer') === -1)) {
		throw apiError.unauthorized();
	}
	const userData = await verifyToken(req.headers['authorization'].replace('Bearer', '').trim());
	return userData;
};

const allUserAuth = async (req, res, next) => {
	try {
		const userData = await getVerifyToken(req);
		req.userInfo = userData.data;
		next();
	} catch (err) {
		next(err);
	}
};

const adminAuth = async (req, res, next) => {
	try {
		const userData = await getVerifyToken(req);
		const user = userData.data;
		if (user.role !== ADMIN_ROLE) {
			throw apiError.unauthorized();
		}
		req.userInfo = user;
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = {
	allUserAuth,
	adminAuth,
};
