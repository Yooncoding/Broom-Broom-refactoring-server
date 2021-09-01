import getApi from "../../utils/response";
import HistoryService from "../../services/history";

const HistoryController = {
  getHistory: async (req, res, next) => {
    try {
      const { id } = req.user;
      const tab = req.query.tab ? req.query.tab : "selling";
      const page = req.query.page ? req.query.page : 1;
      const posts = await HistoryService.getHistory(id, tab, page);

      res.status(200).json(getApi({ suc: true, data: posts }));
    } catch (err) {
      next(err);
    }
  },

  postReview: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { postId } = req.params;
      const { review } = req.query;
      await HistoryService.postReview(id, postId, review);

      res.status(201).json(getApi({ suc: true, mes: "리뷰점수 등록" }));
    } catch (err) {
      next(err);
    }
  },
};
export default HistoryController;
