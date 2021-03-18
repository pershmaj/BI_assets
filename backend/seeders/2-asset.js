"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("assets", data);
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete("assets", [], {});
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
const data = [
  {
      name: 'picture-1',
      link: "picture-1.jpg",
      user_id: 1,
  },
  {
      name: 'picture-2',
      link: "picture-2.jpg",
      user_id: 1,
  },
  {
    name: 'picture-3',
    link: "picture-3.jpg",
    user_id: 2,
}
];
