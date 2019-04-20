var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
// for passport and json web token authentication
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {// to create token
    return jwt.sign(user, config.secretKey,//1st parameter is payload,2nd is secret key
        {expiresIn: 3600});
};

var opts = {};//options for strategy
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//to extract token from request
opts.secretOrKey = config.secretKey;//2nd parameter
 //JSON Web token strategy
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {//verify function ...done is callback
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});