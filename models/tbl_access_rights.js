'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_access_rights = sequelize.define('tbl_access_rights', {
    access_right: DataTypes.STRING
  }, {});
  tbl_access_rights.associate = function(models) {
    // associations can be defined here
    tbl_access_rights.hasMany(models.tbl_access_rights_assoc, {
      foreignKey: 'access_rights_id',
    });
    tbl_access_rights.belongsTo(models.tbl_main_access_right, {
      foreignKey: 'main_access_right_id',  
    });


  };
  return tbl_access_rights;
};