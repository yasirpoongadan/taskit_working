'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_cmp_work_time_assoc = sequelize.define('tbl_cmp_work_time_assoc', {
    day_no: DataTypes.INTEGER,
    week_no: DataTypes.INTEGER
  }, {});
  tbl_cmp_work_time_assoc.associate = function(models) {
    // associations can be defined here
    
    tbl_cmp_work_time_assoc.belongsTo(models.tbl_cmp_work_time, {
    foreignKey: 'cmp_work_time_id',
    });

  };
  return tbl_cmp_work_time_assoc;
};