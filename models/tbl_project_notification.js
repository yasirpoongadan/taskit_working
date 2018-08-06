'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_notification = sequelize.define('tbl_project_notification', {
    is_viewed: DataTypes.BOOLEAN
  }, {});
  tbl_project_notification.associate = function (models) {
    // associations can be defined here
    tbl_project_notification.belongsTo(models.tbl_project, {
      foreignKey: 'project_id',
    });
    tbl_project_notification.belongsTo(models.tbl_user_profile, {
      foreignKey: 'user_profile_id',
    });
    tbl_project_notification.belongsTo(models.tbl_project_notif_type, {
      foreignKey: 'type_id',
    });


  };
  return tbl_project_notification;
};