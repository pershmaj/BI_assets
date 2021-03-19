"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("users", data);
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete("users", [], {});
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
const data = [
  {
      nickname: 'dima',
      password: "1aee48a1ce9885851ed10b486ed333ee181944db", // 1
  },
  {
      nickname: 'bi',
      password: "b115bccca47d00205103e697d32a39d58fb294fe", // bestintheworld
  }
];
