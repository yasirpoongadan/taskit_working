'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_user_profile = sequelize.define('tbl_user_profile', {
    f_name: DataTypes.STRING,
    l_name: DataTypes.STRING,
    contact_no: DataTypes.STRING,
    join_date: DataTypes.DATE,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  tbl_user_profile.associate = function (models) {
    // associations can be defined here
    tbl_user_profile.belongsTo(models.tbl_login, {
      foreignKey: 'login_id',
    });
    tbl_user_profile.belongsTo(models.tbl_designation, {
      foreignKey: 'designation_id',
    });
    tbl_user_profile.belongsTo(models.tbl_prev_exp, {
      foreignKey: 'prev_exp_id',
    });
    tbl_user_profile.hasMany(models.tbl_emp_leave, {
      foreignKey: 'user_profile_id',
    });
    tbl_user_profile.hasMany(models.tbl_project, {
      foreignKey: 'pm_id',
      as: 'pm_id',
    });
    tbl_user_profile.hasMany(models.tbl_project, {
      foreignKey: 'assignee_id',
      as: 'assignee_id',
    });
    tbl_user_profile.hasMany(models.tbl_log, {
      foreignKey: 'user_profile_id',
    });
    tbl_user_profile.hasMany(models.tbl_project_notification, {
      foreignKey: 'user_profile_id',
    });
    tbl_user_profile.hasMany(models.tbl_project_estimation_team, {
      foreignKey: 'head_id',
    });
    tbl_user_profile.hasMany(models.tbl_lock_period, {
      foreignKey: 'user_profile_id',
    });
    tbl_user_profile.hasMany(models.tbl_team_assoc, {
      foreignKey: 'user_profile_id',
    });
    tbl_user_profile.hasMany(models.tbl_project_estimation_team_members, {
      foreignKey: 'user_profile_id',
    });
    tbl_user_profile.hasMany(models.tbl_estimation_notification, {
      foreignKey: 'from_id',
      as: 'from_id',
    });
    tbl_user_profile.hasMany(models.tbl_estimation_notification, {
      foreignKey: 'to_id',
      as: 'to_id',
    });
    tbl_user_profile.hasMany(models.tbl_project_member_assoc, {
      foreignKey: 'user_profile_id',
    });
    tbl_user_profile.hasMany(models.tbl_new_task_request, {
      foreignKey: 'assigned_to_id',
    });
    tbl_user_profile.hasMany(models.tbl_project_tasks, {
      foreignKey: 'assigned_to_id',

    });
    tbl_user_profile.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',
    });
    tbl_user_profile.belongsTo(models.tbl_role, {
      foreignKey: 'role_id',
    });
    // tbl_user_profile.hasMany(models.tbl_project_tasks, {
    //   foreignKey: 'verified_user_profile_id',
    //   as :'verifieduerid'
    // });
    tbl_user_profile.hasMany(models.tbl_project, {
      foreignKey: 'team_head_id',
    });
  };
  return tbl_user_profile;
};