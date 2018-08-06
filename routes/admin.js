var models = require('../models');
var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
const Config = require('../config/database');
const jwt = require("jsonwebtoken");
var Plans = models.tbl_plan;
var Company = models.tbl_company;
var Login = models.tbl_login;
var Role = models.tbl_role;
var User = models.tbl_user_profile;
var Projects = models.tbl_project;
var Users = models.tbl_user_profile;
var Industries = models.tbl_industry;
var CompanySize = models.tbl_company_size;
var Estimations = models.tbl_estimation;
var EstimationTeam = models.tbl_project_estimation_team;
var EstimationTeamMember = models.tbl_project_estimation_team_members;
var ProjectModule = models.tbl_project_modules;
var Log = models.tbl_log;
var ProjectTask = models.tbl_project_tasks;
var ProjectCategory = models.tbl_project_category;
var http = require('http');
var express = require('express');
var path = require('path');
/* const config = require("./config/config"); */
var nodePrd = require('node-prd');
var direct = './'
var reportBundlePathdir = __dirname+'/../';
var outfilepathdir =  __dirname+'/../';
var prdhomepathdir = __dirname+'/../';

var designerpath = './report-designer'
var fs = require('fs');
var returnRouter = function (io) {
  if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
  // ---------------------------------Start-------------------------------------------
  // Function      : Allcompanies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : all companies
  router.get('/allcompanies', function (req, res) {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.substring(4), decoded;
      //     try {
      //decoded = jwt.verify(authorization, Config.secret);
      Company.findAll({
        order: [['id', 'DESC']],
        include: [{
          model: Login,
          required: true
          //where: {id: Sequelize.col('login.role_id')}
        }]
      }).then(company => {
        //console.log(projects);
        res.json(company);
      });
    } else {
      return res.status(401).send('Invalid User');
    }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Allactivecompanies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : all activecompanies
  router.get('/allactivecompanies', function (req, res) {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.substring(4), decoded;
      //     try {
      //decoded = jwt.verify(authorization, Config.secret);
      if (config.use_env_variable) {
        var sequelize = new Sequelize(process.env[config.use_env_variable]);
      } else {
        var sequelize = new Sequelize(config.database, config.username, config.password, config);
      }
      Company.findAll({
        order: [['id', 'DESC']],
        include: [{
          model: Login,
          required: true,
          where: { [Op.and]: [{ block_status: false, delete_status: false }] }
        }]
      }).then(company => {
        return res.json(company);
      });
    } else {
      return res.status(401).send('Invalid User');
    }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Alldeletedcompanies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : all deletedcompanies
  router.get('/alldeletedcompanies', function (req, res) {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.substring(4), decoded;
      //     try {
      //decoded = jwt.verify(authorization, Config.secret);
      if (config.use_env_variable) {
        var sequelize = new Sequelize(process.env[config.use_env_variable]);
      } else {
        var sequelize = new Sequelize(config.database, config.username, config.password, config);
      }
      Company.findAll({
        order: [['id', 'DESC']],
        include: [{
          model: Login,
          required: true,
          where: { delete_status: true }
        }]
      }).then(company => {
        return res.json(company);
      });
    } else {
      return res.status(401).send('Invalid User');
    }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Allblockedcompanies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : all blockedcompanies
  router.get('/allblockedcompanies', function (req, res) {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.substring(4), decoded;
      //     try {
      //decoded = jwt.verify(authorization, Config.secret);
      if (config.use_env_variable) {
        var sequelize = new Sequelize(process.env[config.use_env_variable]);
      } else {
        var sequelize = new Sequelize(config.database, config.username, config.password, config);
      }
      Company.findAll({
        order: [['id', 'DESC']],
        include: [{
          model: Login,
          required: true,
          where: { [Op.and]: [{ delete_status: false, block_status: true }] }
        }]
      }).then(company => {
        return res.json(company);
      });
    } else {
      return res.status(401).send('Invalid User');
    }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Allsubcompanies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : all subcompanies
  router.get('/allsubcompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //     try {
    // //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { cmp_status: 'Subscribed' }
      },
      {
        model: Plans
      }]
    }).then(company => {
      return res.json(company);
    });
    //   } else {
    //     return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : All active subcompanies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : all  active subcompanies
  router.get('/allsubactivecompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //     try {
    // //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Subscribed', delete_status: false, block_status: false }] }
      },
      {
        model: Plans
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : All subscribed companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : allsubblockcompanies
  router.get('/allsubblockcompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Subscribed', delete_status: false, block_status: true }] }
      },
      {
        model: Plans
      }
      ]
    }).then(company => {
      return res.json(company);
    });
    //   } else {
    //     return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End------------executeReport-------------------------------      
  // ---------------------------------Start-------------------------------------------
  // Function      : All subscribed  delete companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : allsubdeletecompanies
  router.get('/allsubdeletecompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Subscribed', delete_status: true }] }
      },
      {
        model: Plans
      }]
    }).then(company => {
      return res.json(company);
    });
    //   } else {
    //     return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------   
  // ---------------------------------Start-------------------------------------------
  // Function      : All trail companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : all trailcompanies
  router.get('/alltrialcompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { cmp_status: 'Trail' }
      }]
    }).then(company => {
      return res.json(company);
    });
    //   } else {
    //     return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : All trail active companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : alltrialactivecompanies
  router.get('/alltrialactivecompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Trail', delete_status: false, block_status: false }] }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------    
  // ---------------------------------Start-------------------------------------------
  // Function      : All trail block companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : alltrialblockcompanies
  router.get('/alltrialblockcompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Trail', delete_status: false, block_status: true }] }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------      
  // ---------------------------------Start-------------------------------------------
  // Function      : All trail delete companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : alltrialdeletecompanies
  router.get('/alltrialdeletecompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Trail', delete_status: true }] }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------     
  // ---------------------------------Start-------------------------------------------
  // Function      : Allexpired companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : all expired companies
  router.get('/allexpiredcompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { cmp_status: 'Expired' }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : All expired active companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : allexpiredactivecompanies
  router.get('/allexpiredactivecompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Expired', delete_status: false, block_status: false }] }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------    
  // ---------------------------------Start-------------------------------------------
  // Function      : All expired block companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : allexpiredblockcompanies
  router.get('/allexpiredblockcompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Expired', delete_status: false, block_status: true }] }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------      
  // ---------------------------------Start-------------------------------------------
  // Function      : All expired delete companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : allexpireddeletecompanies
  router.get('/allexpireddeletecompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Expired', delete_status: true }] }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }          
  });
  // ----------------------------------End-------------------------------------------   
  // ---------------------------------Start-------------------------------------------
  // Function      : All not verified companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : all not verified companies
  router.get('/allnotverficompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { cmp_status: 'Not Verified' }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : All Not Verified active companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : allnotverfiactivecompanies
  router.get('/allnotverfiactivecompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Not Verified', delete_status: false, block_status: false }] }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------    
  // ---------------------------------Start-------------------------------------------
  // Function      : All Not Verified block companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : allnotverfiblockcompanies
  router.get('/allnotverfiblockcompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Not Verified', delete_status: false, block_status: true }] }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------      
  // ---------------------------------Start-------------------------------------------
  // Function      : All Not Verified  delete companies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : allnotverfideletecompanies
  router.get('/allnotverfideletecompanies', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: Login,
        required: true,
        where: { [Op.and]: [{ cmp_status: 'Not Verified', delete_status: true }] }
      }]
    }).then(company => {
      return res.json(company);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------   
  // ---------------------------------Start-------------------------------------------
  // Function      : block company
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : block company
  router.put('/blockcompany/:id', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Login.update({
      block_status: true
    }, {
        where: {
          id: req.params.id
        }
      }).then(company => {
        if (!company) {
          return res.json({ success: false, msg: 'Faild to block company' });
        } else {
          io.sockets.emit("blockcompany", {
            //user_id : req.params.id
          });
          return res.json({ success: true, msg: 'Blocked Successfully' });
        }
      });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : unblock company
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : unblock company
  router.put('/unblockcompany/:id', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Login.update({
      block_status: false
    }, {
        where: {
          id: req.params.id
        }
      }).then(company => {
        if (!company) {
          return res.json({ success: false, msg: 'Faild to unblock company' });
        } else {
          io.sockets.emit("blockcompany", {
            //user_id : req.params.id
          });
          return res.json({ success: true, msg: 'UnBlocked Successfully' });
        }
      });
    //   } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : delete company
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : delete company
  router.put('/deletecompany/:id', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Login.update({
      delete_status: true
    }, {
        where: {
          id: req.params.id
        }
      }).then(company => {
        if (!company) {
          return res.json({ success: false, msg: 'Faild to delete company' });
        } else {
          io.sockets.emit("deletecompany", {
            //user_id : req.params.id
          });
          return res.json({ success: true, msg: 'Deleted successfully' });
        }
      });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-----------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : adminnotification
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : adminnotification
  router.get('/adminnotification', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      order: [['id', 'DESC']],
      where: { is_admin_viewed: false },
      include: [{
        model: Login,
        required: true,
        where: { is_verified: true },
      }]
    }).then(company => {
      return res.json(company);
    })
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------  
  // ---------------------------------Start-------------------------------------------
  // Function      : viewstatusadmin
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : viewstatusadmin
  router.put('/viewstatusadmin/:id', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.update({
      is_admin_viewed: true
    }, {
        where: {
          id: req.params.id
        }
      }).then(company => {
        if (!company) {
          return res.json({ success: false, msg: 'Faild to viewstatus company' });
        } else {
          io.sockets.emit("viewstatusadmin", {
            //user_id : req.params.id
          });
          return res.json({ success: true, msg: 'viewstatus Successfully' });
        }
      });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // ----------------------------------End-------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : get_counts_for_dashboard
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 02-03-2018
  // Last Modified : 02-03-2018, Jooshifa 
  // Desc          : for getting count of companies,projects,users
  if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
  router.post('/get_counts_for_dashboard', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    var userCount;
    var cmpCount;
    var projectCount;
    sequelize.query("select count(*) from tbl_logins where block_status != :status and delete_status != :status and role_id != 1 and role_id != 2", { replacements: { status: true } }).spread((myTableRows1) => {
      // res.json(myTableRows)
      userCount = myTableRows1[0].count;
      sequelize.query("select count(*) from tbl_companies").spread(myTableRows2 => {
        // res.json(myTableRows)
        cmpCount = myTableRows2[0].count;
        sequelize.query("select count(*) from tbl_projects").spread(myTableRows3 => {
          // res.json(myTableRows)
          projectCount = myTableRows3[0].count;
          res.json({
            users: userCount,
            companies: cmpCount,
            projects: projectCount
          })
        })
      })
    })
    /*___________________COUNT IN MODEL EXAMPLE______________________*/
    // Login.findAndCountAll({
    //   where: {
    //     block_status: {
    //       [Op.ne]:true
    //     }
    //   }
    // }).then(projects => {
    //   res.json(projects);
    // })
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  //  ---------------------------------Start-------------------------------------------
  // Function      : super_admin_pie_graph
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, 
  // Desc          : get piegraph data
  router.get('/super_admin_pie_graph', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    count = [];
    Login.findAndCountAll({
      where: {
        cmp_status: 'Not Verified'
      }
    }).then(dbres => {
      count.push({ name: 'Not verified', value: dbres.count, color: '#E35594' });
      Login.findAndCountAll({
        where: {
          // is_verified: {
          //   [Op.ne]: true
          // },
          cmp_status: 'Trail'
        }
      }).then(dbres2 => {
        count.push({ name: 'Trial', value: dbres2.count, color: '#E55537' });
        Login.findAndCountAll({
          where: {
            cmp_status: 'Subscribed'
          }
        }).then(dbres3 => {
          count.push({ name: 'Subscribed', value: dbres3.count, color: '#12AB60' });
          Login.findAndCountAll({
            where: {
              cmp_status: 'Expired'
            }
          }).then(dbres4 => {
            count.push({ name: 'Expired', value: dbres4.count, color: '#00B0D9' });
            res.json(count);
          })
        })
      })
    })
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  //  ---------------------------------End-------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : super_admin_pie_graph
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, 
  // Desc          : get piegraph data
  router.get('/super_admin_bar_graph', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    // console.log('y')
    count = [];
    // Projects.findAll({
    //   include: [{
    //     model: Company
    //   }],
    // }).then(dbres2 => {
    //   res.json(dbres2)
    // })
    Company.findAll({
      include: [{
        model: Projects,
        // where: {id:0}
        // where: {id: Sequelize.col('login.role_id')}
      }]
    }).then(companies => {
      //console.log(projects);
      res.json(companies);
    });
    //   if (config.use_env_variable) {
    //     var sequelize = new Sequelize(process.env[config.use_env_variable]);
    //   } else {
    //     var sequelize = new Sequelize(config.database, config.username, config.password, config);
    //   }
    //   sequelize.query("select * from GetAllSt();").spread(
    //     function (actualres, settingName2) {
    //       console.log(actualres);
    //       console.log(settingName2);
    //       res.json(actualres);
    // });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  //  ---------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin Login
  // Params        : admin, contains username and password
  // Returns       : Token, admin id and role
  // Author        : Rinsha
  // Date            : 01-03-2018
  // Last Modified   : 01-03-2018, Rinsha
  // Desc          : Admin login
  router.post('/login', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    const email = req.body.email;
    const password = req.body.password;
    if (email == '' || password == '') {
      res.json({ success: false, msg: "All fields are required" });
    }
    else {
      // sequelize.query("select * from tbl_logins where role_id=2 and  email= :email;", { replacements: { email: email } }).spread(
      //   function (res1, settingName2) {
      //     // console.log(res1);
      //     if (res1 == '') {
      //       res.json({ success: false, msg: "Incorrect Username or Password" });
      //     }
      //     else if (res1[0].password != password) {
      //       res.json({ success: false, msg: "Incorrect Username or Password" });
      //     }
      //     else if (res1[0].password == password) {
      //       res.json({
      //         success: true,
      //         msg: 'login succesfully',
      //       });
      //     }
      //   });
      Login.findOne({
        where: {
          email: req.body.email,
          role_id: 2,
          password: req.body.password
        }
      }).then(login => {
        if (login === null) {
          res.json({ success: false, msg: "Incorrect Username or Password" });
        }
        else {
          const token = jwt.sign(login.toJSON(), Config.secret, {
            expiresIn: 60400 // sec 1 week
          });
          res.json({
            success: true,
            msg: 'login succesfully',
            token: 'JWT ' + token,
            admin: {
              role_id: login.role_id
            }
          });
        }
      });
    }
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // -----------------------------------End-----------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get all plans 
  // Params        : 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 05-03-2018
  // Last Modified : 05-03-2018, Rinsha
  // Desc          : getAllplans 
  router.get('/allplans', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    // sequelize.query("select * from tbl_plans").spread(
    //   function (result, settingName2) {
    //     // console.log(result);
    //     res.json(result);
    //   });
    Plans.findAll({ order: [['createdAt', 'DESC']] }).then(plans => {
      // console.log(plans);
      res.json(plans);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // -----------------------------------End-----------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get all plans without default
  // Params        : 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, Rinsha
  // Desc          : getAllplans without default
  router.get('/allPlansWithoutDefault', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Plans.findAll({
      where: {
        is_defualt: {
          [Op.ne]: true
        }
      },
      order: [['createdAt', 'DESC']]
    }).then(plans => {
      res.json(plans);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // -----------------------------------End-----------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : add plan
  // Params        : data from form
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : add plan 
  router.post('/addPlan', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    // console.log(req.body);
    planName = myTrim(req.body.plan_name);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    plan_name = capitalizeFirstLetter(req.body.plan_name);
    Plans.findAll().then(plans => {
      if (plans.length >= 4) {
        res.json({ success: false, msg: "Can't Add, Maximum number of plan reached" });
      }
      else {
        Plans.findAll({
          where: {
            plan_name: req.body.plan_name
          }
        }).then(plans => {
          if (plans.length != 0) {
            res.json({ success: false, msg: "Plan Name Already Exists" });
          }
          else if (req.body.plan_name == '' || req.body.plan_price == '' || req.body.plan_price == null || req.body.no_projects == '' || req.body.no_members == '' || req.body.no_modules == '' || req.body.no_tasks == '') {
            res.json({ success: false, msg: "All fields are required" });
          }
          else if (planName.length > 10 || planName.length < 3) {
            res.json({ success: false, msg: "Plan Name between 3-10 characters" });
          }
          else if (req.body.plan_price < 1) {
            res.json({ success: false, msg: "Plan price should be valid" });
          }
          else {
            if (req.body.no_projects == 'Unlimited') {
              no_projects = req.body.no_projects;
            } else {
              no_projects = req.body.value1;
            }
            if (req.body.no_members == 'Unlimited') {
              no_members = req.body.no_members;
            } else {
              no_members = req.body.value2;
            }
            if (req.body.no_modules == 'Unlimited') {
              no_modules = req.body.no_modules;
            } else {
              no_modules = req.body.value3;
            }
            if (req.body.no_tasks == 'Unlimited') {
              no_tasks = req.body.no_tasks;
            } else {
              no_tasks = req.body.value4;
            }
            const plan = Plans.build({
              plan_name: plan_name,
              plan_price: req.body.plan_price,
              no_projects: no_projects,
              no_members: no_members,
              no_modules: no_modules,
              no_tasks: no_tasks
            })
            plan.save().then(function (newPlan) {
              // console.log(newPlan);
              io.sockets.emit("addPlan", {
              });
              res.json({ success: true, msg: "Plan Created Successfully" });
            })
          }
        });
      }
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // -----------------------------------End-----------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : myTrim
  // Params        : string
  // Returns       : string
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : For removing unwanted space from left and right
  function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : best plan
  // Params        : id and value
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : to change a plan to best
  router.post('/bestPlan/:id', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    // console.log(req.params.id + ":id," + req.body.status +":status")
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Plans.update({
      is_best_value: false
    }, {
        where: {
          id: {
            [Op.ne]: req.params.id
          }
        }
      }).then(data => {
        Plans.update({
          is_best_value: req.body.status
        }, {
            where: {
              id: req.params.id
            }
          }).then(data1 => {
            if (data1 == 1) {
              io.sockets.emit("bestPlan", {
              });
              res.json({ success: true, msg: "Success" });
            }
            else {
              res.json({ success: false, msg: "Failed" });
            }
          });
      });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // -----------------------------------End-----------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : delete plan
  // Params        : id 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : to delete a plan which is'nt used by any company
  router.get('/deletePlan/:id', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Company.findAll({
      where: {
        plan_id: req.params.id
      }
    }).then(company => {
      if (company.length != 0) {
        res.json({ success: false, msg: "Can't delete, it is already used by a company!" });
      }
      else {
        Plans.findById(req.params.id).then(plans => {
          if (plans.is_defualt == true) {
            res.json({ success: false, msg: "Default plan can't delete!" });
          }
          else {
            Plans.destroy({
              where: {
                id: req.params.id
              }
            }).then(plan => {
              io.sockets.emit("deletePlan", {
              });
              res.json({ success: true, msg: "Deleted Successfully" });
            });
          }
        });
      }
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // -----------------------------------End-----------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get plan by id
  // Params        : 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : getplan
  router.get('/planById/:id', function (req, res) {
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    Plans.findById(req.params.id).then(plans => {
      res.json(plans);
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : update plan
  // Params        : value from form
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : update a plan
  router.post('/updatePlan', function (req, res) {
    console.log(req.body.nomodules);
    console.log(req.body.no_modules)
    // if (req.headers && req.headers.authorization) {
    //   var authorization = req.headers.authorization.substring(4), decoded;
    //   //decoded = jwt.verify(authorization, Config.secret);
    // console.log(req.body);
    if (config.use_env_variable) {
      var sequelize = new Sequelize(process.env[config.use_env_variable]);
    } else {
      var sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    // console.log("hhh")
    // console.log(req.body.plan_name)
    planName = myTrim(req.body.plan_name);
    Plans.findAll({
      where: {
        plan_name: req.body.plan_name,
        id: {
          [Op.ne]: req.body.id
        }
      }
    }).then(plans => {
      if (plans.length != 0) {
        res.json({ success: false, msg: "Plan Name Already Exists" });
      }
      else if (req.body.plan_name == '') {
        res.json({ success: false, msg: "All fields are required" });
      }
      else if (req.body.is_defualt == false) {
        if (req.body.plan_price == '' || req.body.plan_price == null) {
          res.json({ success: false, msg: "All fields are required" });
        }
        else {
          if (req.body.noprojects == 'Unlimited') {
            no_projects = req.body.noprojects;
          } else {
            no_projects = req.body.no_projects;
          }
          if (req.body.nomembers == 'Unlimited') {
            no_members = req.body.nomembers;
          } else {
            no_members = req.body.no_members;
          }
          if (req.body.notasks == 'Unlimited') {
            no_tasks = req.body.notasks;
          } else {
            no_tasks = req.body.no_tasks;
          }
          if (req.body.nomodules == 'Unlimited') {
            no_modules = req.body.nomodules;
          } else {
            no_modules = req.body.no_modules;
          }
          Plans.update({
            plan_name: req.body.plan_name,
            plan_price: req.body.plan_price,
            no_projects: no_projects,
            no_members: no_members,
            no_tasks: no_tasks,
            no_modules: no_modules,
          }, {
              where: {
                id: req.body.id
              }
            }).then(data1 => {

              if (data1 == 1) {

                io.sockets.emit("updatePlan", {
                });
                res.json({ success: true, msg: "Success" });
              }
              else {
                res.json({ success: false, msg: "Failed" });
              }
            });
        }
      }
      else if (planName.length > 10 || planName.length < 3) {
        res.json({ success: false, msg: "Plan Name between 3-10 characters" });
      }
      else if (req.body.is_defualt == false && req.body.plan_price < 1) {
        res.json({ success: false, msg: "Plan price should be valid" });
      }
      else {
        if (req.body.noprojects == 'Unlimited') {
          no_projects = req.body.noprojects;
        } else {
          no_projects = req.body.no_projects;
        }
        if (req.body.nomembers == 'Unlimited') {
          no_members = req.body.nomembers;
        } else {
          no_members = req.body.no_members;
        }
        if (req.body.notasks == 'Unlimited') {
          no_tasks = req.body.notasks;
        } else {
          no_tasks = req.body.no_tasks;
        }
        if (req.body.nomodules == 'Unlimited') {
          no_modules = req.body.nomodules;
        } else {
          no_modules = req.body.no_modules;
        }
        Plans.update({
          plan_name: req.body.plan_name,
          plan_price: req.body.plan_price,
          no_projects: no_projects,
          no_members: no_members,
          no_tasks: req.no_tasks,
          no_modules: no_modules,
        }, {
            where: {
              id: req.body.id
            }
          }).then(data1 => {
            if (data1 == 1) {
              io.sockets.emit("updatePlan", {
              });
              res.json({ success: true, msg: "Success" });
            }
            else {
              res.json({ success: false, msg: "Failed" });
            }
          });
      }
    });
    // } else {
    //   return res.status(401).send('Invalid User');
    // }
  });
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : capitalizeFirstLetter
  // Params        : string
  // Returns       : 
  // Author        : Rinsha
  // Date          : 04-04-2018
  // Last Modified : 04-04-2018, Rinsha
  // Desc          :  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // -----------------------------------End------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : Get logged in entity
  // Params        : 
  // Returns       : Get logged in entity
  // Author        : Rinsha
  // Date          : 20-04-2018
  // Last Modified : 20-04-2018, Rinsha
  // Desc          :   
  router.get('/getLoggedinUser', (req, res, next) => {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.substring(4),
        decoded;
      decoded = jwt.verify(authorization, Config.secret);
      res.json(decoded);
      // // console.log(decoded);
      try {
        decoded = jwt.verify(authorization, Config.secret);
        res.json(decoded);
      } catch (e) {
        // return res.status(401).send('unauthorized');
        res.json('');
      }
    } else {
      res.json('');
    }
  });
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get all estimated project
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 06-04-2018
  // ---------------------------------Start-------------------------------------------
  // Function      : getProjectReport
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 12-04-2018
  // Last Modified : 12-04-2018, Yasir Poongadan
  // Desc          : getProjectReport
  router.post('/getProjectReport', function (req, res) {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.substring(4),
        decoded;
      decoded = jwt.verify(authorization, Config.secret);
      cmp_id = decoded.cmp_id;
      //   res.json(decoded);
      // // console.log(decoded);

      var start = new Date(req.body.sDate);
      start.setHours(00, 00, 00, 000);
      var end = new Date(req.body.eDate);
      end.setHours(23, 59, 59, 999);
      let whereCond = {
        [Op.and]: [{ cmp_id: cmp_id }
          , {
          [Op.or]: [
            { planned_start_date: { $between: [start, end] } },
            // {actual_start_date: { $between: [start, end]}},
          ]
        }],
      }
      // let prjWhereCond = {}
      if (req.body.selProj != 'All') {
        whereCond.id = req.body.selProj;
      }
      if (req.body.selCat != 'All') {
        whereCond.category_id = req.body.selCat;
      }
      if (req.body.status != 'All') {
        whereCond.status = req.body.status;
      }
      if (req.body.pm != 'All') {
        whereCond.pm_id = req.body.pm;
      }
      Projects.findAll({
        where: whereCond,
        include: [
          {
            model: ProjectModule,
            include: [
              {
                model: ProjectTask,
                include: [
                  {
                    model: Users,
                  }
                ]
              }
            ]
          },
          {
            model: Login, as: 'Pm_id',
            include: [
              {
                model: User
              },
              {
                model: Company
              }
            ]

          },
          {
            model: ProjectCategory
          }
        ]

      }).then((proj) => {
        resp = [];

        proj.forEach(function (prjct, index) {
          members = [];
          mbrs = [];
          ttlHr = 0;
          prjct.tbl_project_modules.forEach((modules) => {
            modules.tbl_project_tasks.forEach((task) => {
              taskhr = task.planned_hour + task.buffer_hour;
              ttlHr += taskhr;
              if (task.assigned_to_id != null) {
                if (mbrs.indexOf(task.assigned_to_id) == -1) {
                  mbrs.push(task.assigned_to_id);
                  members.push(task.tbl_user_profile);
                }
              }
            });
          });
          // proj[index].ttlHr = ttlHr;
          resp.push({ prj: prjct, ttlHr: ttlHr, members: members });
        });
        res.json(resp);
      });
    } else {
      return res.status(401).send('Invalid User');
    }
  });
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getActivityLog
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 17-04-2018
  // Last Modified : 17-04-2018, Yasir Poongadan
  // Desc          : get Activity Log
  router.post('/getActivityLog', function (req, res) {
    // console.log(req.body);
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.substring(4),
        decoded;
      decoded = jwt.verify(authorization, Config.secret);
      cmp_id = decoded.cmp_id;
      var start = new Date(req.body.sDate);
      start.setHours(00, 00, 00, 000);
      var end = new Date(req.body.eDate);
      end.setHours(23, 59, 59, 999);
      // let whereCond = {
      //   [Op.and]: [{} 
      //     , {[Op.or]: [
      //         {planned_start_date: { $between: [start, end]}},
      //         // {actual_start_date: { $between: [start, end]}},
      //       ]
      //   }],
      // }
      whereCond = {
        cmp_id : cmp_id,
        [Op.or]: [
          { createdAt: { $between: [start, end] } },
        ]
      };
      if (req.body.selUsers != 'All') {
        whereCond.user_profile_id = req.body.selUsers;
      }
      Log.findAll({
        where: whereCond,
        include: [
          {
            model: Users,
            where: { cmp_id: cmp_id },
            required: true
          }
        ]
      }).then((proj) => {
        res.json(proj);
      });
    } else {
      return res.status(401).send('Invalid User');
    }
  });
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getAllProject
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 17-04-2018
  // Last Modified : 17-04-2018, Yasir Poongadan
  // Desc          : getAllProject
  router.post('/getAllProject', function (req, res) {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.substring(4),
        decoded;
      decoded = jwt.verify(authorization, Config.secret);
      cmp_id = decoded.cmp_id;
      Projects.findAll({
        where: { cmp_id: cmp_id },
      }).then((proj) => {
        res.json(proj);
      });
    } else {
      return res.status(401).send('Invalid User');
    }

  });
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getAllEstimatedProject
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 09-04-2018
  // Last Modified : 24-05-2018, Rinsha
  // Desc          : get all estimated project
  router.post('/getAllEstimatedProject', function (req, res) {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization.substring(4), decoded;
      decoded = jwt.verify(authorization, Config.secret);
      cmp_id = decoded.cmp_id;
      // EstimationTeam.findAll({
      //   include: [
      //     {
      //       model: EstimationTeamMember,

      var start = new Date(req.body.sDate);
      start.setHours(00, 00, 00, 000);
      var end = new Date(req.body.eDate);
      end.setHours(23, 59, 59, 999);

      let whereCondinProject = {
        cmp_id: decoded.cmp_id,
      }
      if (req.body.selProj !== "All") {
        whereCondinProject.id = req.body.selProj;
      }
      if (req.body.selCat !== "All") {
        whereCondinProject.category_id = req.body.selCat;
      }

      let whereCondinEst = {
        [Op.and]: [{
          is_accepted: true,
          is_resubmitted: false
        }
          , {
          [Op.or]: [
            { date_time: { $between: [start, end] } },
          ]
        }],
      }

      Estimations.findAll({
        where: whereCondinEst,
        include: [
          {
            model: Projects,
            where: { cmp_id: cmp_id }
          },
          {
            model: EstimationTeam,
            include: [{
              model: Users
            },

            ],
          }
        ]
      }).then(estimation => {
        res.json(estimation);
      });
    } else {
      return res.status(401).send('Invalid User');
    }
  });
  // -----------------------------------End------------------------------------------
  /*  
   app.get('/downloadFile', function (req, res) {
      var file = path.join(__dirname, 'file.pdf');
      res.download(file, function (err) {
          if (err) {
              console.log("Error");
              console.log(err);
          } else {
              console.log("Success");
          }
      });
   });
  */
  router.post('/logexecuteReport', function (req, res) {
    console.log("prdhome path");

      if (req.headers && req.headers.authorization) {
         var authorization = req.headers.authorization.substring(4), decoded;
         decoded = jwt.verify(authorization, Config.secret);
         req.body = req.body.params
         cmp_id = decoded.cmp_id;
         console.log(cmp_id);
         sdate = new Date(req.body.sDate);
         sdate.setHours(00, 00, 00, 000); 
         edate = new Date(req.body.eDate);
         edate.setHours(00, 00, 00, 000);
         selUsers = req.body.selUsers
         startTimeStamp =  sdate.getTime()/1000;
         endTimeStamp = edate.getTime()/1000;
   
         timestamp = new Date().getTime().toString();
         console.log(req.body.filetype );
         if(req.body.filetype == 'pdf'){
          var savedFilename =  'activitylog';
           var outputType =  "pdf";
           var outfilepath = "activitylog.pdf";
           var contentType = 'text/pdf';
         }
         else if(req.body.filetype == 'excel'){
          var savedFilename =  'activitylogexcel';
           var outputType =  "excelXlsx";
          var outfilepath = "activitylogexcel.xlsx"
          var contentType = 'application/octet-stream';
         }
        
        if(selUsers == 'All'){
         // console.log(""+reportBundlePathdir+"/report-templates/activity-log-no-user-parms.prpt");
         // console.log("/home/jooshifa/Desktop/COPYtoLINUX/report-templates/activity-log-no-user-parms.prpt");
         var nPrd = nodePrd.createInstance(
           {
               reportBundlePath: ""+reportBundlePathdir+"/report-templates/activity-log-no-user-parms.prpt",
               outputFilePath: path.resolve(+outfilepathdir+"/out/report/"+savedFilename),
               outputType: outputType,
               params: [
                
                 { name: "start_date", value: startTimeStamp ,type: "Integer"},
                 { name: "cmp_id", value:cmp_id, type: "Integer" },
                 { name: "end_date", value: endTimeStamp ,type: "Integer" },
             ]   
           },
           {
               prdHomePath: ""+prdhomepathdir+'/report-designer',
               tmpParentFolder: __dirname
           }
       );
        }
        else{
         var nPrd = nodePrd.createInstance(
           {
               reportBundlePath: reportBundlePathdir+"/report-templates/activity-log-report.prpt",
               outputFilePath: path.resolve(""+outfilepathdir+"/out/report/"+outfilepath),
               outputType: outputType,
               params: [
                 { name: "user", value:selUsers, type: "Integer" },
                  { name: "cmp_id", value:cmp_id, type: "Integer" },
                 { name: "start_date", value: startTimeStamp ,type: "Integer"},
                 { name: "end_date", value: endTimeStamp ,type: "Integer" },
             ]   
           },
           {
             prdHomePath: ""+prdhomepathdir+'/report-designer',
               tmpParentFolder: __dirname
           }
       );
        }
        
         // docName = req.body.selUsers + timestamp + Math.floor(100000 + Math.random()  900000); */
      
       
           nPrd.initRaaS(3333, true, true);
           console.log('Running report...'); 
           nPrd.runReport(function (code) {
             console.log("CODE", code)
             if (code == 0){
             console.log("Report OK");
   
             //-------------------------------------------------------------------------------------------
   
            //  console.log("here"); /
             var mime = require('mime');
             fs.readFile('./out/report/'+outfilepath , function (err, content) {
               if (err) {
                   res.writeHead(400, {'Content-type':contentType})
                   console.log(err);
                   res.end("No such file");    
               } else {
                   var file = './out/report/'+outfilepath;
                   var filename = path.basename(file);
                   var mimetype = mime.lookup(file);
                   res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                   res.setHeader('Content-type', mimetype);
                   var filestream = fs.createReadStream(file);
                   filestream.pipe(res);
               }
           });
              //--------------------------------------------------------------------------------------
             }  
             else{
               console.log("Report ERROR=" + code);
             }
               
         }, false, true); 
   
         } else {
           return res.status(401).send('Invalid User');
         }
       });
     // -----------------------------------End------------------------------------------

     router.post('/estimationReport', function (req, res) {
      console.log("hereee");
      console.log(req.body)
       if (req.headers && req.headers.authorization) {
          var authorization = req.headers.authorization.substring(4), decoded;
          decoded = jwt.verify(authorization, Config.secret);
          req.body = req.body.params
          cmp_id = decoded.cmp_id;
          console.log(cmp_id);
          sdate = new Date(req.body.sDate);
          sdate.setHours(00, 00, 00, 000); 
          edate = new Date(req.body.eDate);
          edate.setHours(00, 00, 00, 000);
          selProj = req.body.selProj;
          selCat = req.body.selCat;
          startTimeStamp =  sdate.getTime()/1000;
          endTimeStamp = edate.getTime()/1000;
    
          timestamp = new Date().getTime().toString();
        
          if(req.body.filetype == 'pdf'){
           var savedFilename =  'estimationpdf';
            var outputType =  "pdf";
            var outfilepath = "estimationpdf.pdf";
            var contentType = 'text/pdf';
          }
          else if(req.body.filetype == 'excel'){
           var savedFilename =  'estimationexcel';
            var outputType =  "excelXlsx";
           var outfilepath = "estimationexcel.xlsx"
           var contentType = 'application/octet-stream';
          }
         
         if(selProj == 'All' && selCat =='All' ){
          var nPrd = nodePrd.createInstance(
            {
                reportBundlePath: ""+reportBundlePathdir+"/report-templates/estim-report-no-pro-and-cat-params.prpt",
                outputFilePath: path.resolve(""+outfilepathdir+"/out/report/"+savedFilename),
                outputType: outputType,
                params: [
                 
                  { name: "start_date", value: startTimeStamp ,type: "Integer"},
                  { name: "cmp_id", value:cmp_id, type: "Integer" },
                  { name: "end_date", value: endTimeStamp ,type: "Integer" },
              ]   
            },
            {
              prdHomePath: ""+prdhomepathdir+'/report-designer',
                tmpParentFolder: __dirname
            }
        );
         }
         else if(selProj == 'All' && selCat !=='All' ){
          var nPrd = nodePrd.createInstance(
            {
                reportBundlePath: ""+reportBundlePathdir+"/report-templates/estim-report-no-project-param.prpt",
                outputFilePath: path.resolve(""+outfilepathdir+"/out/report/"+outfilepath),
                outputType: outputType,
                params: [
                  { name: "category", value:selCat, type: "Integer" },
                  { name: "cmp_id", value:cmp_id, type: "Integer" },
                  { name: "start_date", value: startTimeStamp ,type: "Integer"},
                  { name: "end_date", value: endTimeStamp ,type: "Integer" },
              ]   
            },
            {
              prdHomePath: ""+prdhomepathdir+'/report-designer',
                tmpParentFolder: __dirname
            }
        );
         }
         else if(selProj !== 'All' && selCat =='All'){
          var nPrd = nodePrd.createInstance(
            {
                reportBundlePath: ""+reportBundlePathdir+"/report-templates/estim-report-no-categ-params.prpt",
                outputFilePath: path.resolve(""+outfilepathdir+"/out/report/"+outfilepath),
                outputType: outputType,
                params: [
                  { name: "project", value:selProj, type: "Integer" },
                  { name: "cmp_id", value:cmp_id, type: "Integer" },
                  { name: "start_date", value: startTimeStamp ,type: "Integer"},
                  { name: "end_date", value: endTimeStamp ,type: "Integer" },
              ]   
            },
            {
              prdHomePath: ""+prdhomepathdir+'/report-designer',
                tmpParentFolder: __dirname
            }
        );
         }
         else if(selProj !== 'All' && selCat !=='All'){
          var nPrd = nodePrd.createInstance(
            {
                reportBundlePath: ""+reportBundlePathdir+"/report-templates/estimation-report.prpt",
                outputFilePath: path.resolve(""+outfilepathdir+"/out/report/"+outfilepath),
                outputType: outputType,
                params: [
                  { name: "project", value:selProj, type: "Integer" },
                  { name: "category", value:selCat, type: "Integer" },
                  { name: "cmp_id", value:cmp_id, type: "Integer" },
                  { name: "start_date", value: startTimeStamp ,type: "Integer"},
                  { name: "end_date", value: endTimeStamp ,type: "Integer" },
              ]   
            },
            {
              prdHomePath: ""+prdhomepathdir+'/report-designer',
                tmpParentFolder: __dirname
            }
        );
         }
          // docName = req.body.selUsers + timestamp + Math.floor(100000 + Math.random()  900000); */
       
        
            nPrd.initRaaS(3333, true, true);
            console.log('Running report...'); 
            nPrd.runReport(function (code) {
              console.log("CODE", code)
              if (code == 0){
              console.log("Report OK");
    
              //-------------------------------------------------------------------------------------------
    
             //  console.log("here"); /
              var mime = require('mime');
              fs.readFile('./out/report/'+outfilepath , function (err, content) {
                if (err) {
                    res.writeHead(400, {'Content-type':contentType})
                    console.log(err);
                    res.end("No such file");    
                } else {
                    var file = './out/report/'+outfilepath;
                    var filename = path.basename(file);
                    var mimetype = mime.lookup(file);
                    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                    res.setHeader('Content-type', mimetype);
                    var filestream = fs.createReadStream(file);
                    filestream.pipe(res);
                }
            });
               //--------------------------------------------------------------------------------------
              }  
              else{
                console.log("Report ERROR=" + code);
              }
                
          }, false, true); 
    
          } else {
            return res.status(401).send('Invalid User');
          }
        });
      // -----------------------------------End------------------------------------------

      router.post('/projectReport', function (req, res) {
        console.log("hereee");
        console.log(req.body)
         if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.substring(4), decoded;
            decoded = jwt.verify(authorization, Config.secret);
            req.body = req.body.params
            cmp_id = decoded.cmp_id;
       
            sdate = new Date(req.body.sDate);
            sdate.setHours(00, 00, 00, 000); 
            edate = new Date(req.body.eDate);
            edate.setHours(00, 00, 00, 000);
            selProj = req.body.selProj;
            selCat = req.body.selCat;
            startTimeStamp =  sdate.getTime()/1000;
            endTimeStamp = edate.getTime()/1000;
      
            timestamp = new Date().getTime().toString();
          
            if(req.body.filetype == 'pdf'){
             var savedFilename =  'projectpdf';
              var outputType =  "pdf";
              var outfilepath = "projectpdf.pdf";
              var contentType = 'text/pdf';
            }
            else if(req.body.filetype == 'excel'){
             var savedFilename =  'projectexcel';
              var outputType =  "excelXlsx";
             var outfilepath = "projectexcel.xlsx"
             var contentType = 'application/octet-stream';
            }
           
           if(selProj == 'All' && selCat == 'All'){
            var nPrd = nodePrd.createInstance(
              {
                  reportBundlePath: ""+reportBundlePathdir+"/report-templates/project-report-no-cat-no-projct-param.prpt",
                  outputFilePath: path.resolve(""+outfilepathdir+"/out/report/"+savedFilename),
                  outputType: outputType,
                  params: [
                   
                    { name: "start_date", value: startTimeStamp ,type: "Integer"},
                    { name: "cmp_id", value:cmp_id, type: "Integer" },
                    { name: "end_date", value: endTimeStamp ,type: "Integer" },
                ]   
              },
              {
                prdHomePath: ""+prdhomepathdir+'/report-designer',
                  tmpParentFolder: __dirname
              }
          );
           }
           else if(selProj == 'All' && selCat !== 'All'){
            var nPrd = nodePrd.createInstance(
              {
                  reportBundlePath: ""+reportBundlePathdir+"/report-templates/project-report-no-project.prpt",
                  outputFilePath: path.resolve(""+outfilepathdir+"/out/report/"+outfilepath),
                  outputType: outputType,
                  params: [
                    { name: "category", value:selCat, type: "Integer" },
                    { name: "cmp_id", value:cmp_id, type: "Integer" },
                    { name: "start_date", value: startTimeStamp ,type: "Integer"},
                    { name: "end_date", value: endTimeStamp ,type: "Integer" },
                ]   
              },
              {
                prdHomePath: ""+prdhomepathdir+'/report-designer',
                  tmpParentFolder: __dirname
              }
          );
           }
           else if(selProj !== 'All' && selCat == 'All'){
            var nPrd = nodePrd.createInstance(
              {
                  reportBundlePath: +reportBundlePathdir+"/report-templates/project-report-no-catg.prpt",
                  outputFilePath: path.resolve(""+outfilepathdir+"/out/report/"+outfilepath),
                  outputType: outputType,
                  params: [
                    { name: "project", value:selProj, type: "Integer" },
                    { name: "cmp_id", value:cmp_id, type: "Integer" },
                    { name: "start_date", value: startTimeStamp ,type: "Integer"},
                    { name: "end_date", value: endTimeStamp ,type: "Integer" },
                ]   
              },
              {
                prdHomePath: ""+prdhomepathdir+'/report-designer',
                  tmpParentFolder: __dirname
              }
          );
           }
           else if(selProj !== 'All' && selCat !== 'All'){
            var nPrd = nodePrd.createInstance(
              {
                  reportBundlePath: +reportBundlePathdir+"/report-templates/project-report.prpt",
                  outputFilePath: path.resolve(""+outfilepathdir+"/out/report/"+outfilepath),
                  outputType: outputType,
                  params: [
                    { name: "project", value:selProj, type: "Integer" },
                    { name: "category", value:selCat, type: "Integer" },
                    { name: "cmp_id", value:cmp_id, type: "Integer" },
                    { name: "start_date", value: startTimeStamp ,type: "Integer"},
                    { name: "end_date", value: endTimeStamp ,type: "Integer" },
                ]   
              },
              {
                prdHomePath: ""+prdhomepathdir+'/report-designer',
                  tmpParentFolder: __dirname
              }
          );
           }
            // docName = req.body.selUsers + timestamp + Math.floor(100000 + Math.random()  900000); */
         
          
              nPrd.initRaaS(3333, true, true);
              console.log('Running report...'); 
              nPrd.runReport(function (code) {
                console.log("CODE", code)
                if (code == 0){
                console.log("Report OK");
      
                //-------------------------------------------------------------------------------------------
      
               //  console.log("here"); /
                var mime = require('mime');
                fs.readFile('./out/report/'+outfilepath , function (err, content) {
                  if (err) {
                      res.writeHead(400, {'Content-type':contentType})
                      console.log(err);
                      res.end("No such file");    
                  } else {
                      var file = './out/report/'+outfilepath;
                      var filename = path.basename(file);
                      var mimetype = mime.lookup(file);
                      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                      res.setHeader('Content-type', mimetype);
                      var filestream = fs.createReadStream(file);
                      filestream.pipe(res);
                  }
              });
                 //--------------------------------------------------------------------------------------
                }  
                else{
                  console.log("Report ERROR=" + code);
                }
                  
            }, false, true); 
      
            } else {
              return res.status(401).send('Invalid User');
            }
          });
        // -----------------------------------End------------------------------------------

  module.exports = router;
  return router;
}
module.exports = returnRouter;
