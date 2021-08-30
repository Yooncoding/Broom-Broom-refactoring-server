import CogService from "./cog";

const AdminService = {
  getCog: async (type, tab, filter, page) => {
    const cog = await CogService.getCog(type, tab, filter, page);
    return cog;
  },
};

export default AdminService;
