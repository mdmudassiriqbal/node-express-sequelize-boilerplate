module.exports = {
	apps: [
		{
			name: 'restApi',
			script: './server.js',
			watch: '.',
			env: {
				PORT: 3001,
				NODE_ENV: 'development',
			},
			env_production: {
				PORT: 3001,
				NODE_ENV: 'production',
			},
		},
	],
	deploy: {
		production: {
			user: 'ubuntu',
			host: '0.0.0.0',
			key: './your.pem',
			ref: 'origin/master',
			repo: 'git@github.com',
			path: '/home/ubuntu/settingNeeds-apis',
			'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production && pm2 save',
		},
	},
};
