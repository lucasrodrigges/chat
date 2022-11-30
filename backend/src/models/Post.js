const { Model, DataTypes, QueryTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      rate: DataTypes.INTEGER,
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

  async countVotes() {
    const [{ rate }] = await this.sequelize.query(`
    SELECT COUNT(v.post_id) AS rate
    FROM chat.votes v
    WHERE v.post_id = ?`, {
      type: QueryTypes.SELECT,
      replacements: [this.id],
    });

    return rate;
  }
}

module.exports = Post;
