'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_team = sequelize.define('tbl_project_team', {}, {});
  tbl_project_team.associate = function (models) {
    // associations can be defined here
    tbl_project_team.belongsTo(models.tbl_team, {
      foreignKey: 'team_id',
    });
    tbl_project_team.belongsTo(models.tbl_project, {
      foreignKey: 'project_id',
    });
    tbl_project_team.hasMany(models.tbl_project_member_assoc, {
      foreignKey: 'project_team_id',
    });
    // tbl_project_team.hasMany(models.tbl_project_tasks, {
    //   foreignKey: 'project_team_id',
    // });

  };
  return tbl_project_team;
};