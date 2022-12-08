const User = require('../models/User');
const { HttpError } = require('../utils/errors');
// const Message = require('../models/Message');

module.exports = {
  sendMessage: async (id, message) => {
    const user = await User.findByPk(id);

    if (!user) throw new HttpError(404, 'User not found.');

    await user.createSentMessage(message);
  },
};
