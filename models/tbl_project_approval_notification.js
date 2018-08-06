'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_approval_notification = sequelize.define('tbl_project_approval_notification', {
    is_admin_viewed: DataTypes.BOOLEAN,
    is_team_leader_viewed: DataTypes.BOOLEAN
  }, {});
  tbl_project_approval_notification.associate = function(models) {
    // associations can be defined here
    tbl_project_approval_notification.belongsTo(models.tbl_project, {
      foreignKey: 'project_id',
      });
  };
  return tbl_project_approval_notification;
};