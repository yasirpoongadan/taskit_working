'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_member_assoc = sequelize.define('tbl_project_member_assoc', {}, {});
  tbl_project_member_assoc.associate = function(models) {
    // associations can be defined here
    tbl_project_member_assoc.belongsTo(models.tbl_project, {
      foreignKey: 'project_id',
    });
    tbl_project_member_assoc.belongsTo(models.tbl_user_profile, {
      foreignKey: 'user_profile_id',
    });
    tbl_project_member_assoc.belongsTo(models.tbl_project_team, {
      foreignKey: 'project_team_id',
    });
  };
  return tbl_project_member_assoc;
};