'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_prev_exp = sequelize.define('tbl_prev_exp', {
    exp_range: DataTypes.STRING
  }, {});
  tbl_prev_exp.associate = function(models) {
    // associations can be defined here
    tbl_prev_exp.hasMany(models.tbl_user_profile, {
      foreignKey: 'prev_exp_id',
    });
  };
  return tbl_prev_exp;
};