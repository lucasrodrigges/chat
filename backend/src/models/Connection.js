const { Model } = require('sequelize');

class Connection extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize,
      underscored: true,
    });
  }

  static associate({ User }) {
    User.belongsToMany(User, {
      as: 'friends',
      through: this,
      foreignKey: 'user1_id',
      otherKey: 'user2_id',
    });
  }
}

module.exports = Connection;
