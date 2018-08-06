'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_revised_history = sequelize.define('tbl_project_revised_history', {
    planned_end_date: DataTypes.DATE
  }, {});
  tbl_project_revised_history.associate = function(models) {
    tbl_project_revised_history.belongsTo(models.tbl_project, {
      foreignKey: 'project_id',

    })
    // associations can be defined here
  };
  return tbl_project_revised_history;
};