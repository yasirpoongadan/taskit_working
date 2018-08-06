
module.exports = {
   
   
    // 'facebookAuth' : {
    //     'clientID'      : '708228956040399', // your App ID
    //     'clientSecret'  : 'c07f07855d5fdbb599715a33c9415310', // your App Secret
    //     'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
    //     'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    //     'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    // },

    'facebookAuth' : {
        'clientID'      : '228775914527296', // your App ID
        'clientSecret'  : '4588ac3f104e42d32f02f7b4ef975406', // your App Secret
        'callbackURL'   : 'http://http://18.191.91.25/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    
    'googleAuth': {
        'clientID': '665056473442-sj0i3d319q5kjsq96soba4fptcs10abd.apps.googleusercontent.com',
        'clientSecret': 'zlcaSsTuJnurP0FqKCdDiwNT',
        'callbackURL': 'http://18.191.91.25/auth/google/callback'
    }
 
};