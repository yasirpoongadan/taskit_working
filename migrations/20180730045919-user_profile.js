'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'tbl_projects', //tbl_logins
      'team_head_id', //cmp_id
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "tbl_user_profiles", //tbl_companies
          key: "id" //id
        }
      }
    )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
