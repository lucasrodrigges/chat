const { Model, DataTypes, QueryTypes } = require('sequelize');

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

  static getAllPosts(q, offset) {
    return this.sequelize.query(`
    SELECT p.*, COUNT(v.post_id) AS rate, 
      u.name AS 'author.name', 
      u.id AS 'author.id', 
      u.picture AS 'author.picture', 
      u.user_name AS 'author.userName'  
    FROM chat.posts p
    INNER JOIN chat.users u ON u.id = p.owner
        LEFT JOIN chat.votes v ON v.post_id = p.id
    WHERE p.body LIKE ?
    GROUP BY p.id
    ORDER BY date(p.created_at), rate DESC
    LIMIT ?, 10`, {
      type: QueryTypes.SELECT,
      replacements: [`%${q}%`, offset],
      nest: true,
    });
  }
}

module.exports = Post;
