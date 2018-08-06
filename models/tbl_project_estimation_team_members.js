'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_estimation_team_members = sequelize.define('tbl_project_estimation_team_members', {}, {});
  tbl_project_estimation_team_members.associate = function(models) {
    // associations can be defined here
    tbl_project_estimation_team_members.belongsTo(models.tbl_project_estimation_team, {
      foreignKey: 'estimation_team_id',  
    });
    tbl_project_estimation_team_members.belongsTo(models.tbl_user_profile, {
      foreignKey: 'user_profile_id',  
    });
    tbl_project_estimation_team_members.belongsTo(models.tbl_estimation, {
      foreignKey: 'estimation_team_id',
    });
  };
  return tbl_project_estimation_team_members;
};