/**
 * @description api json 응답 일관성을 유지하기 위한 함수
 * @example json(getApi({ suc: true, data: user }))
 */

const getApi = ({ suc, mes = "", data = null }) => ({ success: suc, message: mes, data });

export default getApi;
