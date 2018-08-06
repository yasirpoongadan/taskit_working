'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_complexity_percentage = sequelize.define('tbl_complexity_percentage', {
    percentage: DataTypes.STRING
  }, {});
  tbl_complexity_percentage.associate = function(models) {
    // associations can be defined here
    tbl_complexity_percentage.hasMany(models.tbl_new_task_request, {
      foreignKey: 'complexity_id',
    });
    tbl_complexity_percentage.hasMany(models.tbl_project_tasks, {
      foreignKey: 'complexity_id',
    });

  };
  return tbl_complexity_percentage;
};