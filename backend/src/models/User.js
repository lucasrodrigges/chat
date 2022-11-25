const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      picture: DataTypes.STRING,
    }, { sequelize });
  }

  static associate(models) {
    this.belongsToMany(models.User, { as: 'friend', through: 'connections' });
  }
}

module.exports = User;
