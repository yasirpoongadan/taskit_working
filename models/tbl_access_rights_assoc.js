'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_access_rights_assoc = sequelize.define('tbl_access_rights_assoc', {}, {});
  tbl_access_rights_assoc.associate = function (models) {
    // associations can be defined here
    tbl_access_rights_assoc.belongsTo(models.tbl_access_rights, {
      foreignKey: 'access_rights_id',
    });
    tbl_access_rights_assoc.belongsTo(models.tbl_role, {
      foreignKey: 'role_id',
    });
    tbl_access_rights_assoc.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',
    });

  };
  return tbl_access_rights_assoc;
};