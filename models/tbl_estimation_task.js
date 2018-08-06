'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_estimation_task = sequelize.define('tbl_estimation_task', {
    task_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    planned_hour: DataTypes.DOUBLE,
    verification_hour: DataTypes.DOUBLE,
    buffer_hour: DataTypes.DOUBLE,
  }, {});
  tbl_estimation_task.associate = function(models) {
    // associations can be defined here
    tbl_estimation_task.belongsTo(models.tbl_estimation_module, {
      foreignKey: 'estimation_module_id',
    });
    tbl_estimation_task.belongsTo(models.tbl_project_estimation_team, {
      foreignKey: 'estimation_team_id',
    });
  };
  return tbl_estimation_task;
};