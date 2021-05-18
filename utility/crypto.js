const CryptoJS = require('crypto-js');

const encrypt = async plainText => {
	const b64 = CryptoJS.AES.encrypt(plainText, process.env.SECRET_KEY).toString();
	const e64 = CryptoJS.enc.Base64.parse(b64);
	const eHex = e64.toString(CryptoJS.enc.Hex);
	return eHex;
};

const decrypt = async cipherText => {
	const reb64 = CryptoJS.enc.Hex.parse(cipherText);
	const bytes = reb64.toString(CryptoJS.enc.Base64);
	const decrypt = CryptoJS.AES.decrypt(bytes, process.env.SECRET_KEY);
	const plain = decrypt.toString(CryptoJS.enc.Utf8);
	return plain;
};

module.exports = {
	encrypt,
	decrypt,
};
