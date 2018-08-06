'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_estimation_team = sequelize.define('tbl_project_estimation_team', {}, {});
  tbl_project_estimation_team.associate = function (models) {
    // associations can be defined here
    tbl_project_estimation_team.belongsTo(models.tbl_project, {
      foreignKey: 'project_id',
    });
    tbl_project_estimation_team.belongsTo(models.tbl_team, {
      foreignKey: 'team_id',
    });
    tbl_project_estimation_team.belongsTo(models.tbl_user_profile, {
      foreignKey: 'head_id',
    });
    tbl_project_estimation_team.hasMany(models.tbl_project_estimation_team_members, {
      foreignKey: 'estimation_team_id',
    });
    tbl_project_estimation_team.hasMany(models.tbl_estimation, {
      foreignKey: 'estimation_team_id',
    });
    tbl_project_estimation_team.hasMany(models.tbl_estimation_task, {
      foreignKey: 'estimation_team_id',
    });
  };
  return tbl_project_estimation_team;
};