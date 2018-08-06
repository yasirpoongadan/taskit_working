'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_company_size = sequelize.define('tbl_company_size', {
    size_range: DataTypes.STRING
  }, {});
  tbl_company_size.associate = function(models) {
    // associations can be defined here
    tbl_company_size.hasMany(models.tbl_company, {
      foreignKey: 'cmp_size_id',
    });

  };
  return tbl_company_size;
};