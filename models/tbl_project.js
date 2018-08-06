'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project = sequelize.define('tbl_project', {
    project_name: DataTypes.STRING,
    project_type: DataTypes.STRING,
    project_code: DataTypes.STRING,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    description: DataTypes.STRING,
    requirement_summary: DataTypes.STRING,
    requirement_attatchment: DataTypes.STRING,
    is_estimation_completed: DataTypes.BOOLEAN,
    is_pm_viewed: DataTypes.BOOLEAN,
    is_admin_viewed: DataTypes.BOOLEAN,
    is_approved: DataTypes.BOOLEAN,
    planned_start_date: DataTypes.DATE,
    planned_end_date: DataTypes.DATE,
    is_estimation_resubmitted: DataTypes.BOOLEAN,
    project_cost: DataTypes.FLOAT,
    total_estimated_hour: DataTypes.FLOAT,
    planned_start_date: DataTypes.DATE,
    planned_end_date: DataTypes.DATE,
    actual_start_date: DataTypes.DATE,
    actual_end_date: DataTypes.DATE,
    is_pm_viewed_for_planning: DataTypes.BOOLEAN,
    is_revised : DataTypes.BOOLEAN,
    notif_proj_comp: DataTypes.BOOLEAN,
  }, {});
  tbl_project.associate = function (models) {
    // associations can be defined here

    tbl_project.belongsTo(models.tbl_project_category, {
      foreignKey: 'category_id',
    });
    tbl_project.belongsTo(models.tbl_login, {
      foreignKey: 'pm_id',
      as: 'Pm_id'
    });
    tbl_project.belongsTo(models.tbl_login, {
      foreignKey: 'assignee_id',
      as: 'Assignee_id'
    });
    tbl_project.belongsTo(models.tbl_company, {
      foreignKey: 'cmp_id',
      as: 'Cmp_id'
    });
    tbl_project.hasMany(models.tbl_project_notification, {
      foreignKey: 'project_id',
    });
    tbl_project.hasMany(models.tbl_project_modules, {
      foreignKey: 'project_id',
    });
    tbl_project.hasMany(models.tbl_project_team, {
      foreignKey: 'project_id',
    });
    tbl_project.hasMany(models.tbl_project_estimation_team, {
      foreignKey: 'project_id',
    });
    tbl_project.hasMany(models.tbl_lock_period, {
      foreignKey: 'project_id',
    });
    tbl_project.hasMany(models.tbl_estimation, {
      foreignKey: 'project_id',
    });
    tbl_project.hasMany(models.tbl_estimation_notification, {
      foreignKey: 'project_id',
    });
    tbl_project.hasMany(models.tbl_project_member_assoc, {
      foreignKey: 'project_id',
    });
    tbl_project.hasMany(models.tbl_project_approval_notification, {
      foreignKey: 'project_id',
    });
    tbl_project.hasMany(models.tbl_project_approval_notification, {
      foreignKey: 'project_id',
    });

    tbl_project.hasMany(models.tbl_project_revised_history, {
      foreignKey: 'project_id',
    });

    tbl_project.belongsTo(models.tbl_user_profile, {
      foreignKey: 'team_head_id',

    });
  };
  return tbl_project;
};