'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_task_time_assoc = sequelize.define('tbl_task_time_assoc', {
    date_time: DataTypes.DATE,
    hour: DataTypes.DOUBLE,
    minute: DataTypes.DOUBLE,
    second: DataTypes.DOUBLE,
    end_date_time : DataTypes.DATE
  }, {});
  tbl_task_time_assoc.associate = function(models) {
    // associations can be defined here
    tbl_task_time_assoc.belongsTo(models.tbl_project_tasks, {
      foreignKey: 'task_id',
    });
  };
  return tbl_task_time_assoc;
};