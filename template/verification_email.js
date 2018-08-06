const nodemailer = require('nodemailer');
const Config = require('../config/database');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mean.symptots@gmail.com", // generated ethereal user
        pass: "Symptots@2017"  // generated ethereal password
    }
});
module.exports.sendUsercredentialMail = function(email, f_name, password){
    nodemailer.createTestAccount((err, account) => {
        
            // create reusable transporter object using the default SMTP transport
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'mean.symptots@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Please log in to your account', // Subject line
                text: '', 
                html: '<b><h3>Hi '+f_name+', </h3><br/>Welcome to Taskit. Click on the following link to start using your account. We also recommend that you save this information as you may need it to login.<a href="' + Config.siteUrl + 'company-login/">Click Login</a><br/><br/>Username:'+email+' <br/>Password:'+password+' <br/> Thank You!</b>' // html body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            });
    });
}
module.exports.sendResetPasswordMail = function(email, password){
    nodemailer.createTestAccount((err, account) => {
        // console.log("here............");
            // create reusable transporter object using the default SMTP transport
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'mean.symptots@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Password reset successfully', // Subject line
                text: '', 
                html: '<b><h3>Hi, </h3><br/>Your password is reset sucessfully. New user name and password is:<br/>Username:'+email+' <br/>Password:'+password+' <br/> login Link:</a> ' + Config.siteUrl + 'company-login</a><br/> Thank You!</b>' // html body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            else{
            //   console.log("sucess");
            }
            });
    });
}

module.exports.sendInvitationMail = function(data){
    nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'mean.symptots@gmail.com', // sender address
                to: data.email, // list of receivers
                subject: 'Online Survey Invitation', // Subject line
                text: '', 
                html: '<b><h3>Dear User, </h3><br/>We’re excited to inform you that <b>' + data.company_name+ '</b> is conducting an online survey on <b>'+ data.survey_name + '</b>. The Survey starts on '+ data.start_date + ' and end on '+ data.end_date + '.<br><br>  You can attend the survey by clicking the link below.<br><br> <a href="'+ data.link + '">Click here </a><img width="1" height="1" border="0" src="'+ data.imgeLink +'" />'
                // html: '<b><h3>Dear User, </h3><br/>We’re excited to get you started using Survey! You’re on your way to being fully set up, but first, you must finish your account verification by clicking the below link:<br/>Username:'+email+' <br/>Password:'+password+' <br/>Verification Link:</a> http://localhost:3000/email-verification/'+verification_link+'</a><br/> Thank You!</b>' // html body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            });
    });
}

module.exports.sendVerificationMail = function(email, contact_name, verification_link){
    nodemailer.createTestAccount((err, account) => {
        
            // create reusable transporter object using the default SMTP transport
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'mean.symptots@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Complete registration process!', // Subject line
                text: '', 
                html: '<b><h3>Hi '+contact_name+', </h3><br/>Welcome to Taskit! You must finish your account verification by clicking the below link: <br/>Verification Link:<a href="' + Config.siteUrl + 'email-verification/'+verification_link+'">' + Config.siteUrl + 'email-verification/'+verification_link+'</a><br/> Thank You!</b>' // html body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            });
    });
}
