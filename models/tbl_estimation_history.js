'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_estimation_history = sequelize.define('tbl_estimation_history', {
    project_id: DataTypes.INTEGER,
    date_time: DataTypes.DATE,
    project_estimation_team_id: DataTypes.INTEGER,
    estimation_hours: DataTypes.DOUBLE,
    reason: DataTypes.TEXT
  }, {});
  tbl_estimation_history.associate = function(models) {
    // associations can be defined here
  };
  return tbl_estimation_history;
};