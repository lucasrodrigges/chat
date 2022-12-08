const { or } = require('sequelize').Op;
const User = require('../models/User');

module.exports = {
  sendMessage: async (userID, targetId, message) => {
    const users = await User.findAll({
      where: {
        id: { [or]: [userID, targetId] },
      },
    });

    if (users.length !== 2) return console.log('User not found');

    await users[0].createSentMessage({ receiver: targetId, content: message });
  },
};
