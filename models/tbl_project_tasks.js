'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_project_tasks = sequelize.define('tbl_project_tasks', {
    task_name: DataTypes.STRING,
    planned_hour: DataTypes.DOUBLE,
    buffer_hour: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    priority: DataTypes.STRING,
    task_type: DataTypes.STRING,
    planned_start_date_time: DataTypes.DATE,
    planned_end_date_time: DataTypes.DATE,
    attachment: DataTypes.TEXT,
    actual_hour: DataTypes.DOUBLE,
    verification_time : DataTypes.DATE,
    verification_status :DataTypes.BOOLEAN,
    verification_hour :DataTypes.DOUBLE,
    is_verif_task: DataTypes.BOOLEAN,
    notif_to_team_head : DataTypes.BOOLEAN,

  }, {});
  tbl_project_tasks.associate = function (models) {
    // associations can be defined here
    tbl_project_tasks.belongsTo(models.tbl_project_modules, {
      foreignKey: 'project_module_id',
    });
    tbl_project_tasks.belongsTo(models.tbl_user_profile, {
      foreignKey: 'assigned_to_id',
     
    });
    tbl_project_tasks.belongsTo(models.tbl_complexity_percentage, {
      foreignKey: 'complexity_id',
    });

    // tbl_project_tasks.belongsTo(models.tbl_user_profile, {
    //   foreignKey: 'verified_user_profile_id',
    //   as :'verifieduerid'
    // });
    // tbl_project_tasks.belongsTo(models.tbl_project_team, {
    //   foreignKey: 'project_team_id',
    // });
    // tbl_project_tasks.hasMany(models.tbl_project_tasks, {
    //   foreignKey: 'task_id',
    // });
    tbl_project_tasks.hasMany(models.tbl_task_status_assoc, {
      foreignKey: 'task_id',
    });
    tbl_project_tasks.hasMany(models.tbl_time_extension_request, {
      foreignKey: 'task_id',
    });
    tbl_project_tasks.hasMany(models.tbl_task_time_assoc, {
      foreignKey: 'task_id',
    });
    tbl_project_tasks.hasMany(models.tbl_task_checklist, {
      foreignKey: 'task_id',
    });
    tbl_project_tasks.belongsTo(models.tbl_project_modules, {
      foreignKey: 'project_module_id',
    });

  };
  return tbl_project_tasks;
};