'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_new_task_request = sequelize.define('tbl_new_task_request', {
    planned_hours: DataTypes.DOUBLE,
    buffer_hours: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    priority: DataTypes.STRING,
    planned_start_date: DataTypes.DATE,
    planned_end_date: DataTypes.DATE,
    attachment: DataTypes.STRING,
    reason: DataTypes.TEXT,
    request_status: DataTypes.STRING,
    task_name: DataTypes.STRING,
  }, {});
  tbl_new_task_request.associate = function (models) {
    // associations can be defined here
    tbl_new_task_request.belongsTo(models.tbl_project_modules, {
      foreignKey: 'project_module_id',
    });
    tbl_new_task_request.belongsTo(models.tbl_user_profile, {
      foreignKey: 'assigned_to_id',
    });
    tbl_new_task_request.belongsTo(models.tbl_complexity_percentage, {
      foreignKey: 'complexity_id',
    });
    tbl_new_task_request.belongsTo(models.tbl_team, {
      foreignKey: 'team_id',
    });
    tbl_new_task_request.hasMany(models.tbl_new_task_req_notification, {
      foreignKey: 'new_task_id',
    });

  };
  return tbl_new_task_request;
};