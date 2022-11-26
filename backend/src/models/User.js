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

  async getReciprocalFriends() {
    const friends = await this.sequelize.query(`
      SELECT 
        u.name, u.id, u.picture
      FROM chat.connections AS c1
        INNER JOIN chat.connections AS c2
          ON c2.user2_id = c1.user1_id AND c1.user2_id = c2.user1_id
        INNER JOIN chat.users AS u
          ON c1.user2_id = u.id
      WHERE c1.user1_id = ${this.id}`, { type: QueryTypes.SELECT });

    return friends;
  }
}

module.exports = User;
