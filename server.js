require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 3000;
const db = require('./database/db');
const errorHandler = require('./utility/ErrorHandler');
const unhandledRequest = require('./utility/UnhandledError');
const cors = require('cors');
const corsOption = {
	origin: '*',
};
app.use(cors(corsOption));
const swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.sequelize.sync({ alter: true }).then(() => {
	console.log(`Database & tables generated!`);
});
//middleware start
require('./middleware/serverMiddleWare');
//middleware end
app.get('/info', (req, res) => {
	res.json({ version: '1.0.0' });
});
app.use('/api/private/', require('./routes/privateRoute'));
app.use('/api/', require('./routes/publicRoute'));
app.use(errorHandler);
app.use(unhandledRequest());
app.listen(port, () => console.log(`setting needs server running on ${port}!`));
