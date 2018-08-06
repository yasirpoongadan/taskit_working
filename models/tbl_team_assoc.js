'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_team_assoc = sequelize.define('tbl_team_assoc', {
    is_head: DataTypes.BOOLEAN
  }, {});
  tbl_team_assoc.associate = function(models) {
    // associations can be defined here
    tbl_team_assoc.belongsTo(models.tbl_team, {
      foreignKey: 'team_id',
    });
    tbl_team_assoc.belongsTo(models.tbl_user_profile, {
      foreignKey: 'user_profile_id',
    });
    tbl_team_assoc.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',
    });
  };
  return tbl_team_assoc;
};