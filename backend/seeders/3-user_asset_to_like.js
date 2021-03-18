"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("user_asset_to_like", data);
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete("user_asset_to_like", [], {});
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
const data = [
  {
      asset_id: 1,
      user_id: 1,
  },
  {
      asset_id: 2,
      user_id: 1,
  },
  {
      asset_id: 1,
      user_id: 2,
  }
];
