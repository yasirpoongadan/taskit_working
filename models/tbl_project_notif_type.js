'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_notif_type = sequelize.define('tbl_project_notif_type', {
    type: DataTypes.STRING
  }, {});
  tbl_project_notif_type.associate = function(models) {
    // associations can be defined here
    tbl_project_notif_type.hasMany(models.tbl_project_notification, {
      foreignKey: 'type_id',
    });

    
  };
  return tbl_project_notif_type;
};