const onlineUsers = [];

module.exports = {
  setOnline: ({ handshake: { userId }, id: socketId }) => onlineUsers.push({ userId, socketId }),

  setOffline: ({ id }) => onlineUsers.splice(onlineUsers.findIndex((u) => u.socketId === id), 1),

  getSocketById: (id) => {
    console.log(onlineUsers);
    const user = onlineUsers.find(({ userId }) => userId === id);

    return user && user.socketId;
  },
};
