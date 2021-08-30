import PostService from "./post";

const HistoryService = {
  getHistory: async (userId, tab, page) => {
    const posts = await PostService.getHistoryPosts(userId, tab, page);
    return posts;
  },

  postReview: async (userId, postId, review) => {
    return await PostService.postReviewPost(userId, postId, review);
  },
};

export default HistoryService;
