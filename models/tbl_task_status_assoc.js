'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_task_status_assoc = sequelize.define('tbl_task_status_assoc', {
    reason: DataTypes.TEXT,
    date_time: DataTypes.DATE,
    task_category : DataTypes.STRING,
  }, {});
  tbl_task_status_assoc.associate = function (models) {
    // associations can be defined here
    tbl_task_status_assoc.belongsTo(models.tbl_project_tasks, {
      foreignKey: 'task_id',
    });
    tbl_task_status_assoc.belongsTo(models.tbl_task_status, {
      foreignKey: 'status_id',
    });
    tbl_task_status_assoc.belongsTo(models.tbl_progress_percentage, {
      foreignKey: 'progress_id',as:'progress'
    });

  };
  return tbl_task_status_assoc;
};