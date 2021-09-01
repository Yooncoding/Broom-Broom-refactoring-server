import getApi from "../../utils/response";
import AdminService from "../../services/admin";

const AdminController = {
  getCog: async (req, res, next) => {
    try {
      const page = req.query.page ? req.query.page : 1;
      const filter = req.query.filter ? req.query.filter : "false";
      const tab = req.query.tab ? req.query.tab : "all";
      const type = req.query.type ? req.query.type : "all";
      const cog = await AdminService.getCog(type, tab, filter, page);

      res.status(200).json(getApi({ suc: true, data: cog }));
    } catch (err) {
      next(err);
    }
  },

  putCog: async (req, res, next) => {
    try {
      const { cogId } = req.params;
      const result = await AdminService.putCog(cogId);

      res.status(201).json(getApi({ suc: true, mes: `${result}에서 요청상태 변경` }));
    } catch (err) {
      next(err);
    }
  },

  deleteCog: async (req, res, next) => {
    try {
      const { cogId } = req.params;
      const result = await AdminService.deleteCog(cogId);

      res.status(200).json(getApi({ suc: true, mes: `${result} 요청 승인` }));
    } catch (err) {
      next(err);
    }
  },
};

export default AdminController;
