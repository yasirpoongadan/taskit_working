'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_estimation_notification = sequelize.define('tbl_estimation_notification', {
    is_completed: DataTypes.BOOLEAN
  }, {});
  tbl_estimation_notification.associate = function(models) {
    // associations can be defined here
    tbl_estimation_notification.belongsTo(models.tbl_project, {
      foreignKey: 'project_id',
    });
    tbl_estimation_notification.belongsTo(models.tbl_estimation, {
      foreignKey: 'estimation_id',
    });
    tbl_estimation_notification.belongsTo(models.tbl_login, {
      foreignKey: 'from_id',
      as: 'From_id',
    });
    tbl_estimation_notification.belongsTo(models.tbl_login, {
      foreignKey: 'to_id',
      as: 'To_id',
    });
  };
  return tbl_estimation_notification;
};