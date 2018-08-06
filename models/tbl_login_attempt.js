'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_login_attempt = sequelize.define('tbl_login_attempt', {
    ip: DataTypes.STRING,
    date_time: DataTypes.DATE,
    is_success: DataTypes.BOOLEAN
  }, {});
  tbl_login_attempt.associate = function(models) {
    // associations can be defined here
  };
  return tbl_login_attempt;
};