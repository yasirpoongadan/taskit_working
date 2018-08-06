'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var tbl_role = sequelize.define('tbl_role', {
    role: DataTypes.STRING,
    is_visible: DataTypes.BOOLEAN
  }, {});
  tbl_role.associate = function (models) {
    // associations can be defined here
    tbl_role.hasMany(models.tbl_login, {
      foreignKey: 'role_id',
    });
    tbl_role.hasMany(models.tbl_access_rights_assoc, {
      foreignKey: 'role_id',
    });
    tbl_role.hasMany(models.tbl_user_profile, {
      foreignKey: 'role_id',
    });
  };
  return tbl_role;
};