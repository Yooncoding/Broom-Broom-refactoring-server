import PostService from "./post";

const HistoryService = {
  getHistory: async (userId, tab, page) => {
    const posts = await PostService.getHistoryPosts(userId, tab, page);
    return posts;
  },
};

export default HistoryService;
