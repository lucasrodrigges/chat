const { Model, DataTypes, QueryTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      picture: DataTypes.STRING,
    }, { sequelize });
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      as: 'friends',
      through: 'connections',
      foreignKey: 'user1_id',
      otherKey: 'user2_id',
    });
  }

  async getAllFriends() {
    return this.sequelize.query(`
      SELECT u.name, u.id, u.picture
      FROM chat.connections c
        INNER JOIN chat.users u
          ON u.id = c.user2_id
      WHERE c.user1_id = ${this.id}`, { type: QueryTypes.SELECT });
  }

  async getReciprocalFriends() {
    return this.sequelize.query(`
      SELECT u.name, u.id, u.picture
      FROM chat.connections c1
        INNER JOIN chat.connections c2
          ON c2.user2_id = c1.user1_id AND c1.user2_id = c2.user1_id
        INNER JOIN chat.users u
          ON c1.user2_id = u.id
      WHERE c1.user1_id = ${this.id}`, { type: QueryTypes.SELECT });
  }

  async getFriendRequests() {
    return this.sequelize.query(`
      SELECT u.name, u.id, u.picture
      FROM chat.connections c1
        INNER JOIN chat.users u
          ON u.id = c1.user1_id
      WHERE c1.user2_id = ${this.id} AND c1.user1_id NOT IN (
        SELECT c2.user2_id FROM chat.connections c2
        WHERE c2.user1_id = c1.user2_id
      )`, { type: QueryTypes.SELECT });
  }
}

module.exports = User;
