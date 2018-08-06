'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_public_holiday = sequelize.define('tbl_public_holiday', {
    title: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  tbl_public_holiday.associate = function(models) {
    // associations can be defined here
    tbl_public_holiday.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',  
    });
  };
  return tbl_public_holiday;
};