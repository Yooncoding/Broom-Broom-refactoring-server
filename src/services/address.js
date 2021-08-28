import UserAddress from "../models/UserAddress";
import District from "../models/District";
import wkt from "terraformer-wkt-parser";
import pool from "../utils/pool";

const AddressService = {
  getAddress: async (userId) => {
    const address = await UserAddress.findOne({
      where: { userId },
      include: { model: District, attributes: ["simpleName"] },
    });
    return address;
  },

  putAddress: async (userId, districtId) => {
    const conn = await pool.getConn();
    const address = await UserAddress.findOne({ where: { userId } });
    const district = await District.findOne({ where: { id: districtId }, attributes: ["geopoint"] });
    const [districts] = await conn.query(
      `SELECT * FROM District WHERE ST_Intersects(geopolygon, ST_GeomFromText(ST_AsText(ST_Buffer(ST_GeomFromText(ST_AsText(ST_GeomFromText('
      ${wkt.convert(district.geopoint)}', 4326))), ${address.scope * 0.01})), 4326));`
    );
    conn.release();

    let nearDistricts = "";
    districts.forEach((district) => {
      nearDistricts += district.id + ",";
    });
    nearDistricts = nearDistricts.slice(0, -1); // 마지막 "," 제거

    return await UserAddress.update({ districtId, nearDistricts }, { where: { userId } });
  },

  getNearDistricts: async (userId, scope) => {
    const conn = await pool.getConn();
    const address = await UserAddress.findOne({ where: { userId }, include: { model: District, attributes: ["geopoint"] } });
    const [districts] = await conn.query(
      `SELECT * FROM District WHERE ST_Intersects(geopolygon, ST_GeomFromText(ST_AsText(ST_Buffer(ST_GeomFromText(ST_AsText(ST_GeomFromText('
      ${wkt.convert(address.District.geopoint)}', 4326))), ${scope * 0.01})), 4326));`
    );
    conn.release();

    let nearDistricts = [];
    districts.forEach((district) => {
      nearDistricts.push(district.simpleName);
    });

    return nearDistricts;
  },
};

export default AddressService;
