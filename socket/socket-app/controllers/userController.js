const User = require('../models/User');


// Socket-friendly methods
exports.getUsers = async () => {
  return await User.find();
};

exports.addUserSocket = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

exports.editUserSocket = async (userData) => {
  const { _id, ...updateFields } = userData;
  return await User.findByIdAndUpdate(_id, updateFields, { new: true });
};

exports.deleteUserSocket = async (id) => {
  return await User.findByIdAndDelete(id);
};
