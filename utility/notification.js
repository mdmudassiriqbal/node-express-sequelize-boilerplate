const admin = require('firebase-admin');

const serviceAccount = require('../setting-needs-6289f-firebase-adminsdk-iskud-016817fab7.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

// const topicName = 'industry-tech';

// const message = {
// 	notification: {
// 		title: 'Breaking News....',
// 	},
// 	android: {
// 		notification: {
// 			click_action: 'news_intent',
// 		},
// 	},
// 	apns: {
// 		payload: {
// 			aps: {
// 				category: 'INVITE_CATEGORY',
// 			},
// 		},
// 	},
// 	webpush: {
// 		fcm_options: {
// 			link: 'breakingnews.html',
// 		},
// 	},
// 	topic: topicName,
// };

module.exports = {
	admin,
	// message,
};
