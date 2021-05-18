const handleSuccessResponse = (res, data, message) => {
	const resp = {
		data,
		message,
	};
	return res.json(resp);
};

module.exports = {
	handleSuccessResponse,
};
