const { Model, DataTypes, QueryTypes } = require('sequelize');
// const User = require('./User');

class Post extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      rate: DataTypes.INTEGER,
      // owner: DataTypes.INTEGER,
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

  async getFriendsPosts(userId) {
    return this.sequelize.query(`
    SELECT p.*, u.name, u.picture
    FROM chat.connections c
      INNER JOIN chat.posts p
        ON p.owner = c.user2_id
      INNER JOIN chat.users u
        ON u.id = c.user2_id
    WHERE c.user1_id = ${userId}
    ORDER BY p.created_at DESC`, { type: QueryTypes.SELECT });
  }
}

module.exports = Post;
