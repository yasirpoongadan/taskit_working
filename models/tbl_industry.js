'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_industry = sequelize.define('tbl_industry', {
    industry: DataTypes.STRING
  }, {});
  tbl_industry.associate = function(models) {
    // associations can be defined here
    tbl_industry.hasMany(models.tbl_company, {
      foreignKey: 'industry_id',
    });

  };
  return tbl_industry;
};