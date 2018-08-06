'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_main_access_right = sequelize.define('tbl_main_access_right', {
    name: DataTypes.STRING
  }, {});
  tbl_main_access_right.associate = function(models) {
    // associations can be defined here
    tbl_main_access_right.hasMany(models.tbl_access_rights, {
      foreignKey: 'main_access_right_id',
      // as: 'main_access_right',
    });

    // tbl_main_access_right.belongsTo(models.tbl_company_size, {
    //   foreignKey: 'cmp_size_id',  
    // });

  };
  return tbl_main_access_right;
};