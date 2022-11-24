const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config);

fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.js') && file !== path.basename(__filename))
  .forEach((file) => {
    const modelPath = path.join(__dirname, '../models', file);
    const model = require(modelPath);

    model.init(sequelize);
  });

module.exports = sequelize;
