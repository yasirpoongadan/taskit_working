'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_task_status = sequelize.define('tbl_task_status', {
    status: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  tbl_task_status.associate = function(models) {
    // associations can be defined here
    tbl_task_status.hasMany(models.tbl_task_status_assoc, {
      foreignKey: 'status_id',
    });

  };
  return tbl_task_status;
};