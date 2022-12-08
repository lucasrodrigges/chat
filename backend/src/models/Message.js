const { Model, DataTypes } = require('sequelize');

class Message extends Model {
  static init(sequelize) {
    super.init({
      content: DataTypes.TEXT,
      sender: DataTypes.INTEGER,
      receiver: DataTypes.INTEGER,
      readAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    }, {
      sequelize,
      underscored: true,
    });
  }

  static associate({ User }) {
    this.belongsTo(User, {
      as: 'messages',
      foreignKey: 'sender',
      otherKey: 'receiver',
    });
  }
}

module.exports = Message;
