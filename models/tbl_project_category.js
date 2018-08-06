'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_category = sequelize.define('tbl_project_category', {
    category_name: DataTypes.STRING,
    delete_status: DataTypes.BOOLEAN
  }, {});
  tbl_project_category.associate = function (models) {
    // associations can be defined here
    tbl_project_category.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',
    });
    tbl_project_category.hasMany(models.tbl_project, {
      foreignKey: 'category_id',
    });


  };
  return tbl_project_category;
};