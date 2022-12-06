const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'owner',
      as: 'author',
    });

    this.belongsToMany(models.User, {
      foreignKey: 'post_id',
      through: 'votes',
      as: 'vote',
    });
  }
}

module.exports = Post;
