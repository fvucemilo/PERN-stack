const router = require('express').Router();
const apiRouter = require('./apiRouter');
const webRouter = require('./webRouter');

router.use('/api/v1', apiRouter);
router.use(webRouter);

module.exports = router;
