'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_cmp_break_assoc = sequelize.define('tbl_cmp_break_assoc', {
    day_no: DataTypes.INTEGER,
    week_no: DataTypes.INTEGER
  }, {});
  tbl_cmp_break_assoc.associate = function(models) {
    // associations can be defined here
    tbl_cmp_break_assoc.belongsTo(models.tbl_cmp_break, {
      foreignKey: 'break_id',
      });

  };
  return tbl_cmp_break_assoc;
};