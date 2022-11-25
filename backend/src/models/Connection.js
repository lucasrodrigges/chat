const { Model, DataTypes } = require('sequelize');

class Connection extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      picture: DataTypes.STRING,
    }, { sequelize });
  }
}

module.exports = Connection;
