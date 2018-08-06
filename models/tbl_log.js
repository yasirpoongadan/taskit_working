'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_log = sequelize.define('tbl_log', {
    action: DataTypes.TEXT,
    ref_id: DataTypes.INTEGER
  }, {});
  tbl_log.associate = function (models) {
    // associations can be defined here
    tbl_log.belongsTo(models.tbl_user_profile, {
      foreignKey: 'user_profile_id',
    });

    tbl_log.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',
    });

  };
  return tbl_log;
};