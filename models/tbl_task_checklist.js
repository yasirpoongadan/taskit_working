'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_task_checklist = sequelize.define('tbl_task_checklist', {
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {});
  tbl_task_checklist.associate = function(models) {
    // associations can be defined here
    tbl_task_checklist.belongsTo(models.tbl_project_tasks, {
      foreignKey: 'task_id',
      });

  };
  return tbl_task_checklist;
};