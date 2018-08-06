'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_time_extension_request = sequelize.define('tbl_time_extension_request', {
    additional_hours: DataTypes.DOUBLE,
    remarks: DataTypes.TEXT,
    req_status: DataTypes.STRING
  }, {});
  tbl_time_extension_request.associate = function(models) {
    // associations can be defined here
    tbl_time_extension_request.belongsTo(models.tbl_project_tasks, {
      foreignKey: 'task_id',
    });
    tbl_time_extension_request.hasMany(models.tbl_time_extension_req_notification, {
      foreignKey: 'request_id',as:'xt'
    });

  };
  return tbl_time_extension_request;
};