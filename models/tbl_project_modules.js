'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_modules = sequelize.define('tbl_project_modules', {
    module_name: DataTypes.STRING
  }, {});
  tbl_project_modules.associate = function (models) {
    // associations can be defined here

    tbl_project_modules.belongsTo(models.tbl_project, {
      foreignKey: 'project_id',
    });
    tbl_project_modules.hasMany(models.tbl_new_task_request, {
      foreignKey: 'project_module_id',
    });
    tbl_project_modules.hasMany(models.tbl_project_tasks, {
      foreignKey: 'project_module_id',
    });
  };
  return tbl_project_modules;
};