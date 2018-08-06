'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var tbl_plan = sequelize.define('tbl_plan', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    plan_name: {
      type: Sequelize.STRING
    },
    plan_price: {
      type: Sequelize.DOUBLE
    },
    is_best_value: {
      type: Sequelize.BOOLEAN
    },
    is_defualt: {
      type: Sequelize.BOOLEAN
    },
    no_projects: {
      type: Sequelize.STRING
    },
    no_members: {
      type: Sequelize.STRING
    },
    no_tasks: {
      type: Sequelize.STRING
    },
    no_modules: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  tbl_plan.associate = function(models) {
  // associations can be defined here
    tbl_plan.hasMany(models.tbl_company, {
      foreignKey: 'plan_id',
      
    });
  
  };
  return tbl_plan;
};