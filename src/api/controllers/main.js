import getApi from "../../utils/response";
import MainService from "../../services/main";

const MainController = {
  getMain: async (req, res, next) => {
    try {
      const { id } = req.user;
      const page = req.query.page ? req.query.page : 1;
      const posts = await MainService.getMain(id, page);

      res.status(200).json(getApi({ suc: true, data: posts }));
    } catch (err) {
      next(err);
    }
  },
};

export default MainController;
