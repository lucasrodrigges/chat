const { Model, DataTypes, QueryTypes } = require('sequelize');
const camelize = require('camelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      userName: DataTypes.STRING,
      bio: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      picture: DataTypes.STRING,
    }, {
      sequelize,
      underscored: true,
    });
  }

  static associate({ Post, Message }) {
    this.hasMany(Message, {
      foreignKey: 'sender',
      as: 'sentMessages',
    });

    this.hasMany(Message, {
      foreignKey: 'receiver',
      as: 'receivedMessages',
    });

    this.hasMany(Post, {
      foreignKey: 'owner',
      as: 'posts',
    });

    this.belongsToMany(Post, {
      foreignKey: 'user_id',
      through: 'votes',
      as: 'likedPosts',
    });
  }

  static async list(userId, q, offset) {
    return this.sequelize.query(`
      SELECT 
        u.name, u.user_name AS userName, u.id, u.bio,
        IF (ISNULL(c1.user1_id),
          IF (ISNULL(c2.user1_id), 0, 2), 
          IF (ISNULL(c2.user1_id), 1, 3)
        ) AS relationship
      FROM chat.users u
        LEFT JOIN chat.connections c1
          ON (c1.user2_id = u.id AND c1.user1_id = ?)
        LEFT JOIN chat.connections c2
          ON (c2.user1_id = u.id AND c2.user2_id = ?)
      WHERE (u.user_name LIKE ? OR u.name LIKE ?)
      LIMIT ?, 10`, {
      type: QueryTypes.SELECT,
      replacements: [userId, userId, `%${q}%`, `%${q}%`, offset],
    });
  }

  async getInfo() {
    const [user] = await this.sequelize.query(`
      SELECT
        u.id, u.name, u.user_name AS userName, u.picture,
        (SELECT COUNT(user1_id) FROM connections c 
        WHERE c.user1_id = u.id ) AS following,
        (SELECT COUNT(user2_id) FROM connections c 
        WHERE c.user2_id = u.id ) AS followers
      FROM chat.users u
      WHERE id = ?`, {
      type: QueryTypes.SELECT,
      replacements: [this.id],
    });

    return user;
  }

  async getFollowing() {
    return this.sequelize.query(`
      SELECT u.id, u.name, u.user_name AS userName, u.picture
      FROM chat.connections c
        INNER JOIN chat.users u ON u.id = c.user2_id
      WHERE c.user1_id = ?`, {
      type: QueryTypes.SELECT,
      replacements: [this.id],
    });
  }

  async getFriends() {
    return this.sequelize.query(`
      SELECT u.name, u.user_name AS userName, u.id, u.picture
      FROM chat.connections c1
        INNER JOIN chat.connections c2
          ON c2.user2_id = c1.user1_id AND c1.user2_id = c2.user1_id
        INNER JOIN chat.users u
          ON c1.user2_id = u.id
      WHERE c1.user1_id = ?`, {
      type: QueryTypes.SELECT,
      replacements: [this.id],
    });
  }

  async getRequests() {
    return this.sequelize.query(`
      SELECT u.name, u.id, u.picture
      FROM chat.connections c1
        INNER JOIN chat.users u ON u.id = c1.user1_id
      WHERE c1.user2_id = ? AND c1.user1_id NOT IN (
        SELECT c2.user2_id FROM chat.connections c2
        WHERE c2.user1_id = c1.user2_id
      )`, {
      type: QueryTypes.SELECT,
      replacements: [this.id],
    });
  }

  async getUserPosts() {
    const posts = await this.sequelize.query(`
      SELECT 
        p.*, COUNT(v.post_id) AS 'rate',
        u.id AS 'author.id',
        u.name AS 'author.name',
        u.user_name AS 'author.userName',
        u.picture AS 'author.picture'
      FROM chat.posts p
        INNER JOIN chat.users u ON p.owner = u.id
        LEFT JOIN chat.votes v ON v.post_id = p.id
      WHERE p.owner = ?
      GROUP BY p.id`, {
      type: QueryTypes.SELECT,
      replacements: [this.id],
      nest: true,
    });

    return camelize(posts);
  }

  async getFriendsPosts() {
    const posts = await this.sequelize.query(`
      SELECT 
        p.*,
        u.id AS 'author.id',
        u.name AS 'author.name',
        u.user_name AS 'author.userName',
        u.picture AS 'author.picture',
        COUNT(v.post_id) AS 'rate'
      FROM chat.connections c
        INNER JOIN chat.posts p ON p.owner = c.user2_id
        INNER JOIN chat.votes v ON v.post_id = p.id
        INNER JOIN chat.users u ON u.id = c.user2_id
      WHERE c.user1_id = ?
      GROUP BY p.id
      ORDER BY p.created_at DESC`, {
      type: QueryTypes.SELECT,
      replacements: [this.id],
      nest: true,
    });

    return camelize(posts);
  }
}

module.exports = User;
