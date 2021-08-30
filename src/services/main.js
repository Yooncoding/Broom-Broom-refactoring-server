import PostService from "./post";

const MainService = {
  getMain: async (userId, page) => {
    const posts = await PostService.getMainPosts(userId, page);
    return posts;
  },
};

export default MainService;
