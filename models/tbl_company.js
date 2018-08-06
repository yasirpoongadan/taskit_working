'use strict';
module.exports = (sequelize, DataTypes) => {
  var tbl_company = sequelize.define('tbl_company', {
    cmp_name: DataTypes.STRING,
    cmp_code: DataTypes.STRING,
    contact_no: DataTypes.STRING,
    why_choosen: DataTypes.TEXT,
    no_months : DataTypes.INTEGER,
    is_admin_viewed : DataTypes.BOOLEAN,
    verification_code: DataTypes.STRING,
    upgraded_date_time : DataTypes.DATE,
  }, {});
  tbl_company.associate = function(models) {
    // associations can be defined here
    tbl_company.belongsTo(models.tbl_login, {
      foreignKey: 'login_id',  
    });
    tbl_company.belongsTo(models.tbl_company_size, {
      foreignKey: 'cmp_size_id',  
    });
    tbl_company.belongsTo(models.tbl_industry, {
      foreignKey: 'industry_id',  
    });
    tbl_company.belongsTo(models.tbl_plan, {
      foreignKey: 'plan_id',  
    });
    tbl_company.hasMany(models.tbl_access_rights_assoc, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_designation, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_project_category, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_public_holiday, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_cmp_off_day_assoc, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_cmp_work_time, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_cmp_break, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_emp_leave, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_project, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_team_assoc, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_user_profile, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_login, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_log, {
      foreignKey: 'cmp_id',
    });
    tbl_company.hasMany(models.tbl_team, {
      foreignKey: 'cmp_id',
    });
  };
  return tbl_company;
};