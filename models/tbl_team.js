'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_team = sequelize.define('tbl_team', {
    team_name: DataTypes.STRING,
    delete_status: DataTypes.BOOLEAN,
    priority: DataTypes.INTEGER
  }, {});
  tbl_team.associate = function(models) {
    // associations can be defined here
    tbl_team.hasMany(models.tbl_project_team, {
      foreignKey: 'team_id',
    });
    tbl_team.hasMany(models.tbl_project_estimation_team, {
      foreignKey: 'team_id',
    });
    tbl_team.hasMany(models.tbl_team_assoc, {
      foreignKey: 'team_id',
    });
    tbl_team.hasMany(models.tbl_new_task_request, {
      foreignKey: 'team_id',
    });
    tbl_team.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',  
    });
  };
  return tbl_team;
};