'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_new_task_req_notification = sequelize.define('tbl_new_task_req_notification', {
    is_pm_viewed: DataTypes.BOOLEAN,
    is_admin_viewed: DataTypes.BOOLEAN,
    is_user_viewed: DataTypes.BOOLEAN
   
  }, {});
  tbl_new_task_req_notification.associate = function(models) {
    // associations can be defined here
    tbl_new_task_req_notification.belongsTo(models.tbl_new_task_request, {
      foreignKey: 'new_task_id',
    });
  };
  return tbl_new_task_req_notification;
};

