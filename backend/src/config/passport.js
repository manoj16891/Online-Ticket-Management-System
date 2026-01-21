
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const UserModel = require('../models/User.model');

//cutom extracting token from header some this type function we can used
// const cookieExtractor = (req) => {
//     let token = null;
//     if (req && req.cookies) {
//         token = req.cookies['token'];
//     }
//     return token;
// }
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await UserModel.findById(jwt_payload.id).select('-password');
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            console.log(error);
        }
    }));
};