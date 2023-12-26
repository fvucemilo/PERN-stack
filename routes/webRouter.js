const router = require('express').Router();

router.get('/', (req, res) =>
  res.render('pages/endpoints', {
    title: 'API Endpoints',
    customScripts: ['js/script.js'],
  })
);

module.exports = router;