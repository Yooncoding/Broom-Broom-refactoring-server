import CogService from "./cog";

const AdminService = {
  getCog: async (type, tab, filter, page) => {
    const cog = await CogService.getCog(type, tab, filter, page);
    return cog;
  },

  putCog: async (cogId) => {
    const status = await CogService.putCog(cogId);
    return status;
  },
};

export default AdminService;
