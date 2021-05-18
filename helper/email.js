const nodemailer = require('nodemailer');

const sendMail = async (from, to, subject, html) => {
	const transporter = nodemailer.createTransport({
		service: process.env.SMTP_SERVICE,
		host: process.env.SMTP_HOST,
		port: parseInt(process.env.SMTP_PORT, 10),
		secure: process.env.SMTP_SECURE === 'true' ? true : false,
		auth: {
			user: process.env.SMTP_EMAIL,
			pass: process.env.SMTP_PASS,
		},
	});
	await transporter.sendMail({
		from,
		to,
		subject,
		html,
	});
	return true;
};

module.exports = {
	sendMail,
};
