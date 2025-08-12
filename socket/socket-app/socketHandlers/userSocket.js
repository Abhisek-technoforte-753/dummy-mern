const userController = require('../controllers/userController');

module.exports = (io, socket) => {
  // Get all users
  socket.on('getUsers', async () => {
    try {
      const users = await userController.getUsers();
      socket.emit('users', users);
    } catch (err) {
      socket.emit('users', []);
    }
  });

  // Add user
  socket.on('addUser', async (userData) => {
    try {
      const user = await userController.addUserSocket(userData);
      socket.emit('userAdded', user);
      const users = await userController.getUsers();
      io.emit('users', users);
    } catch (err) {
      socket.emit('userAdded', { error: err.message });
    }
  });

  // Edit user
  socket.on('editUser', async (userData) => {
    try {
      const user = await userController.editUserSocket(userData);
      socket.emit('userEdited', user);
      const users = await userController.getUsers();
      io.emit('users', users);
    } catch (err) {
      socket.emit('userEdited', { error: err.message });
    }
  });

  // Delete user
  socket.on('deleteUser', async (id) => {
    try {
      await userController.deleteUserSocket(id);
      socket.emit('userDeleted', id);
      const users = await userController.getUsers();
      io.emit('users', users);
    } catch (err) {
      socket.emit('userDeleted', { error: err.message });
    }
  });
};
