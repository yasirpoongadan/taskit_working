'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_estimation_module = sequelize.define('tbl_estimation_module', {
    module_name: DataTypes.STRING
  }, {});
  tbl_estimation_module.associate = function(models) {
    // associations can be defined here
    tbl_estimation_module.belongsTo(models.tbl_estimation, {
      foreignKey: 'estimation_id',
    });
    tbl_estimation_module.hasMany(models.tbl_estimation_task, {
      foreignKey: 'estimation_module_id',
    });
  };
  return tbl_estimation_module;
};