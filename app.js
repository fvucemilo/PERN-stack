const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const listEndpoints = require('express-list-endpoints');
const cors = require('cors');
const corsConfig = require('./config/cors');
const helmet = require('helmet');
const helmetConfig = require('./config/helmet');
const router = require('./routes');
const { emailQueue } = require('./queues/emailQueue');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const path = require('path');

/**
 * Express application instance.
 * @type {express.Application}
 */
const app = express();

/**
 * Adapter for integrating Bull Board with the Express server.
 * @type {ExpressAdapter}
 */
const serverAdapter = new ExpressAdapter().setBasePath('/admin/queues');

/**
 * Configures Bull Board to display queues on the specified path.
 */
createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

/**
 * Adds the Bull Board middleware to the Express app for handling queues.
 */
app.use(serverAdapter.basePath, serverAdapter.getRouter());

/**
 * Middleware to handle Cross-Origin Resource Sharing (CORS) based on the provided configuration.
 */
app.use(cors(corsConfig));

/**
 * Middleware to enhance the security of the Express app using the Helmet middleware with the provided configuration.
 */
app.use(helmet(helmetConfig));

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Middleware to serve static files from the 'public' directory.
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Middleware to enable the use of EJS layouts in the views.
 */
app.use(expressLayouts);

/**
 * Sets the default layout for EJS views.
 */
app.set('layout', './layouts/main');

/**
 * Sets the view engine for rendering EJS templates.
 */
app.set('view engine', 'ejs');

/**
 * Routes defined in the application.
 */
app.use(router);

/**
 * Endpoint to retrieve a list of all endpoints in the Express app.
 */
app.get('/endpoints', (req, res) => res.json(listEndpoints(app)));

/**
 * Export the configured Express application.
 */
module.exports = app;
