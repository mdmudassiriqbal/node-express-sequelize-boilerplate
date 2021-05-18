const jwt = require('jsonwebtoken');

const getToken = rawData => {
	return new Promise(async (resolve, reject) => {
		try {
			if (typeof rawData === 'object' && !Array.isArray(rawData)) {
				const jwtData = {
					exp: Number(Math.floor(Date.now() / 1000) + 60 * 60),
					data: rawData,
				};
				const token = await jwt.sign(jwtData, process.env.JWT_SECRET, {
					algorithm: process.env.JWT_ALGO,
				});
				const data = {
					token,
					expireTs: 60 * 60,
				};
				resolve(data);
			}
			throw new Error('Data not found');
		} catch (err) {
			reject(err);
		}
	});
};

const verifyToken = token => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET, {
				algorithm: process.env.JWT_ALGO,
			});
			resolve(decoded);
		} catch (err) {
			reject({ message: 'Unauthorized access' });
		}
	});
};

module.exports = {
	getToken,
	verifyToken,
};
