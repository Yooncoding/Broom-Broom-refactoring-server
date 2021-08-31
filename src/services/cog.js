import Cog from "../models/Cog";
import CustomError from "../utils/errorhandle";

const CogService = {
  postCog: async (type, amount, userId, bankName, bankAccount) => {
    const data = await Cog.create({ type, amount, bankName, bankAccount, userId });
    return data;
  },

  getCog: async (type, tab, filter, page) => {
    const PAGE_SIZE = 20; // 20개씩 pagination
    const offset = (page - 1) * PAGE_SIZE;

    let typeTarget = ["refund", "charge"];
    if (type === "all") typeTarget = ["refund", "charge"];
    if (type === "refund") typeTarget = "refund";
    if (type === "charge") typeTarget = "charge";

    let tabTarget = ["basic", "hold"];
    if (tab === "all") tabTarget = ["basic", "hold"];
    if (tab === "deal") tabTarget = "basic";
    if (tab === "hold") tabTarget = "hold";

    let filterTarget = "false";
    if (filter === "true") filterTarget = true;
    if (filter === "false") filterTarget = false;

    const cog = await Cog.findAll({
      where: { status: tabTarget, type: typeTarget },
      order: [["createdAt", "asc"]],
      offset: offset,
      limit: PAGE_SIZE,
      paranoid: filterTarget,
    });

    return cog;
  },

  putCog: async (cogId) => {
    const cog = await Cog.findByPk(cogId);
    if (!cog) throw new CustomError("", 400, "이미 처리가 완료된 요청입니다.");

    if (cog.status === "basic") await Cog.update({ status: "hold" }, { where: { id: cogId } });
    if (cog.status === "hold") await Cog.update({ status: "basic" }, { where: { id: cogId } });

    return cog.status;
  },
};

export default CogService;
