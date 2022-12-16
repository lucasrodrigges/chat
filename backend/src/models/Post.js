const { Model, DataTypes, QueryTypes } = require('sequelize');
const camelize = require('camelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
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

  static async getAllPosts(q, offset) {
    const result = await this.sequelize.query(`
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
    ORDER BY date(p.created_at) DESC, rate DESC, p.id
    LIMIT ?, 10`, {
      type: QueryTypes.SELECT,
      replacements: [`%${q}%`, offset],
      nest: true,
    });

    return camelize(result);
  }
}

module.exports = Post;
