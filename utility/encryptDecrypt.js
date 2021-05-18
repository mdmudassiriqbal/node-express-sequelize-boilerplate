const CryptoJS = require('crypto-js');

const encryptData = data => CryptoJS.AES.encrypt(data, process.env.AES_KEY).toString();
const decryptData = encryptedData => {
	const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.AES_KEY);
	const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
	try {
		return JSON.parse(decryptedData);
	} catch (err) {
		return decryptedData;
	}
};

module.exports = {
	encryptData,
	decryptData,
};
