'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_designation = sequelize.define('tbl_designation', {
    designation: DataTypes.STRING,
    delete_status: DataTypes.BOOLEAN
  }, {});
  tbl_designation.associate = function (models) {
    // associations can be defined here
    tbl_designation.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',
    });
    tbl_designation.hasMany(models.tbl_user_profile, {
      foreignKey: 'designation_id',
    });
  };
  return tbl_designation;
};