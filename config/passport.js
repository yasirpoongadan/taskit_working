
const express = require('express');
const app = express();
const JwtStrategy = require('passport-jwt').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const Login = require('./../models/tbl_login');
const config = require('./database');
const passport = require('passport');
var configAuth = require('./auth');
var models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const Company = require('./../models/tbl_company');
var Login = models.tbl_login;
var Company = models.tbl_company;
var Plan = models.tbl_plan;
var WorkingTime = models.tbl_cmp_work_time;
module.exports = function (passport) {
    // console.log("passport");
    // requestTokenURL: 'https://www.provider.com/oauth/request_token';
    // accessTokenURL: 'https://www.provider.com/oauth/access_token';
    // userAuthorizationURL: 'https://www.provider.com/oauth/authorize';
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Login.findOne({
            where: {
                id: jwt_payload._id
            }
        }).then(login => {
            if (login) {
                return done(null, login);
            }
            else {
                return done(null, false);
            }
        });

    }));
    passport.serializeUser(function (login, done) {
        done(null, login.id);
    });

    // used to deserialize the company
    passport.deserializeUser(function (id, done) {
        Login.findById(id, function (err, login) {
            done(err, login);
        });
    });
    // -----------------------------------------------------------------------google startegy----------------------------------------------------------------------------------------------
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
    },
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {
                Login.findOne({
                    where: {
                        email: profile.emails[0].value
                    }
                }).then(login => {
                    if (!login || login == null || login == '' || login == []) {
                        Plan.findOne({
                            where: { is_defualt: true },

                        }).then(companyPlan => {
                            const newLogin = Login.build({
                                google_id: profile.id,
                                google_token: token,
                                email: profile.emails[0].value,
                                cmp_status: "Trail",
                                is_verified: true,
                                role_id: 1

                            })
                            newLogin.save().then(function (newlogin) {
                                Login.findOne({
                                    where: {
                                        email: profile.emails[0].value
                                    }
                                }).then(savedlogin => {
                                    // console.log(savedlogin.id + " saved login i");
                                    const newCompany = Company.build({
                                        cmp_name: profile.displayName,
                                        login_id: savedlogin.id,
                                        plan_id: companyPlan.id
                                    })
                                    newCompany.save().then(function (newcompany) {
                                        WorkingTime.build({
                                            title: "9:00 - 17:00",
                                            cmp_id: newcompany.id,
                                            start_time: "09:00:00",
                                            end_time: "17:00:00",
                                            is_default: true
                                        }).save().then(resTiming => {
                                        return done(null, newCompany);
                                        });
                                    });
                                });
                            });
                        });

                    }
                    else if (login || login != null || login != '' || login != []) {
                        if (login.block_status == false && login.delete_status == false) {
                            Login.update({
                                google_id: profile.id,
                                google_token: token,
                            }, {
                                    where: {
                                        email: profile.emails[0].value
                                    }
                                }).then(data1 => {
                                    Company.findOne({
                                        where: {
                                            login_id: login.id
                                        }
                                    }).then(company2 => {
                                        // console.log(company2  + "company");
                                        return done(null, company2);
                                    });

                                });
                        }
                        else if (login.block_status == true || login.delete_status == true) {
                            return done(err);
                        }
                    } else {


                    }
                });
            });

        }));
    // ----------------------------------------------------------------------end of google strategy-----------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------FB----------------------------------------------------------------------------------------
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: configAuth.facebookAuth.profileFields
    },
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {
                // if(!req.company){
                // Company.findOne({ 'facebook.id' : profile.id }, function(err, company) {
                Login.findOne({
                    where: {
                        email: profile.emails[0].value
                    }
                }).then(login => {
                    if (!login || login == null || login == '' || login == []) {
                        Plan.findOne({
                            where: { is_defualt: true },
                        }).then(companyPlan => {
                            const newLogin = Login.build({
                                fb_id: profile.id,
                                fb_token: token,
                                email: profile.emails[0].value,
                                cmp_status: "Trail",
                                is_verified: true,
                                role_id: 1
                            })
                            newLogin.save().then(function (newlogin) {
                                // console.log(newPlan);
                                // res.json({ success: true, msg: "Login successfully" });
                                Login.findOne({
                                    where: {
                                        email: profile.emails[0].value
                                    }
                                }).then(savedlogin => {
                                    const newCompany = Company.build({
                                        cmp_name: profile.displayName,
                                        login_id: savedlogin.id,
                                        plan_id : companyPlan.id
                                    })
                                    newCompany.save().then(function (newcompany) {
                                        WorkingTime.build({
                                            title: "9:00 - 17:00",
                                            cmp_id: newcompany.id,
                                            start_time: "09:00:00",
                                            end_time: "17:00:00",
                                            is_default: true
                                        }).save().then(resTiming => {
                                        return done(null, newCompany);
                                        });
                                    });
                                });
                            });
                        });
                    }
                    else if (login || login != null || login != '' || login != []) {
                        if (login.block_status == false && login.delete_status == false) {
                            Login.update({
                                fb_id: profile.id,
                                fb_token: token,

                            }, {
                                    where: {
                                        email: profile.emails[0].value
                                    }
                                }).then(data1 => {
                                    Company.findOne({
                                        where: {
                                            login_id: login.id
                                        }
                                    }).then(company2 => {
                                        // console.log(company2  + "company");
                                        return done(null, company2);
                                    });

                                });
                        }
                        else if (login.block_status == true || login.delete_status == true) {
                            return done(err);
                        }
                    } else {


                    }
                });

            });

        }));

    // ------------------------------End of fb strategy-------------------------------------------------------------------------------------------------------------------------------------------------------
}