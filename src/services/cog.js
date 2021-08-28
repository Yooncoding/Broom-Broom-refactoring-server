import Cog from "../models/Cog";

const CogService = {
  postCog: async (type, amount, userId, bankName, bankAccount) => {
    const data = await Cog.create({ type, amount, bankName, bankAccount, userId });
    return data;
  },
};

export default CogService;
