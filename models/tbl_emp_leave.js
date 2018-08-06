'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_emp_leave = sequelize.define('tbl_emp_leave', {
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    start_available_hrs: DataTypes.TIME,
    end_available_hrs: DataTypes.TIME,
    leave_hrs: DataTypes.TIME,
    delete_status: DataTypes.BOOLEAN,
    request_status: DataTypes.STRING,
    reject_reason: DataTypes.STRING,
    is_user_viewed: DataTypes.BOOLEAN,
    is_admin_viewed: DataTypes.BOOLEAN
  }, {});
  tbl_emp_leave.associate = function (models) {
    // associations can be defined here
    tbl_emp_leave.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',
    });
    tbl_emp_leave.belongsTo(models.tbl_user_profile, {
      foreignKey: 'user_profile_id',
    });

  };
  return tbl_emp_leave;
};