'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_lock_period = sequelize.define('tbl_lock_period', {
    start_datetime: DataTypes.DATE,
    end_datetime: DataTypes.DATE,
    delete_status: DataTypes.BOOLEAN
  }, {});
  tbl_lock_period.associate = function(models) {
    // associations can be defined here
    tbl_lock_period.belongsTo(models.tbl_user_profile, {
      foreignKey: 'user_profile_id',
    });
    tbl_lock_period.belongsTo(models.tbl_project, {
      foreignKey: 'project_id',
    });
  };
  return tbl_lock_period;
};