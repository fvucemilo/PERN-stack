module.exports = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: process.env.CORS_CREDENTIALS === 'true',
  optionsSuccessStatus: parseInt(process.env.REDIS_PORT || '204'),
};
