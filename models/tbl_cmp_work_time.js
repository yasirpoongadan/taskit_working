'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_cmp_work_time = sequelize.define('tbl_cmp_work_time', {
    title: DataTypes.STRING,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    is_default: DataTypes.BOOLEAN,
  }, {});
  tbl_cmp_work_time.associate = function(models) {
    // associations can be defined here
    tbl_cmp_work_time.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',
      });
      tbl_cmp_work_time.hasMany(models.tbl_cmp_work_time_assoc, {
        foreignKey: 'cmp_work_time_id',
      });
      // tbl_cmp_work_time.hasMany(models.tbl_cmp_off_day_assoc, {
      //   foreignKey: 'cmp_work_time_id',
      // });
    
  };
  return tbl_cmp_work_time;
};