import User from "../models/User";

const UserService = {
  getUserById: async (id) => {
    return await User.findByPk(id);
  },
};

export default UserService;
