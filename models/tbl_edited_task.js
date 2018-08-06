'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_edited_task = sequelize.define('tbl_edited_task', {
    module_id: DataTypes.INTEGER,
    task_name: DataTypes.STRING,
    assigned_to_id: DataTypes.INTEGER,
    complexity_id: DataTypes.INTEGER,
    planned_hour: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    start_date_time: DataTypes.DATE,
    end_date_time: DataTypes.DATE,
    priority: DataTypes.STRING,
    task_type: DataTypes.STRING,
    status_id: DataTypes.INTEGER,
    progress_id: DataTypes.INTEGER,
    actual_start_datetime: DataTypes.DATE,
    actual_end_datetime: DataTypes.DATE,
    actual_hour: DataTypes.DOUBLE
  }, {});
  tbl_edited_task.associate = function(models) {
    // associations can be defined here
  };
  return tbl_edited_task;
};