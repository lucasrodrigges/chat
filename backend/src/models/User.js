const { Model, DataTypes, QueryTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      userName: DataTypes.STRING,
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

  async getFollowing() {
    return this.sequelize.query(`
      SELECT u.name, u.id, u.picture
      FROM chat.connections c
        INNER JOIN chat.users u ON u.id = c.user2_id
      WHERE c.user1_id = ?`, {
      type: QueryTypes.SELECT,
      replacements: [this.id],
    });
  }

  // async getFriends() {
  //   return this.sequelize.query(`
  //     SELECT u.name, u.id, u.picture
  //     FROM chat.connections c1
  //       INNER JOIN chat.connections c2
  //         ON c2.user2_id = c1.user1_id AND c1.user2_id = c2.user1_id
  //       INNER JOIN chat.users u
  //         ON c1.user2_id = u.id
  //     WHERE c1.user1_id = ?`, {
  //     type: QueryTypes.SELECT,
  //     replacements: [this.id],
  //   });
  // }

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
    return this.sequelize.query(`
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
  }

  async getFriendsPosts() {
    return this.sequelize.query(`
      SELECT 
        p.*, COUNT(v.post_id) AS 'rate',
        u.name AS 'author.name',
        u.picture AS 'author.picture',
        u.id AS 'author.id',
        u.user_name AS 'author.userName'
      FROM chat.connections c
        INNER JOIN chat.posts p ON p.owner = c.user2_id
        INNER JOIN chat.users u ON u.id = c.user2_id
        LEFT JOIN chat.votes v ON v.post_id = p.id
      WHERE c.user1_id = ?
      GROUP BY p.id
      ORDER BY p.created_at DESC`, {
      type: QueryTypes.SELECT,
      replacements: [this.id],
      nest: true,
    });
  }
}

module.exports = User;
