require('dotenv').config();

const env = (key, _default = null) => process.env[key] || _default;

module.exports = env;
