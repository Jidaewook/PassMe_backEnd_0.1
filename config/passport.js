const {Strategy, ExtractJwt} = require('passport-jwt')
const userModel = require('../model/userModel');

module.exports = passport => {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = process.env.SECRET_KEY

    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            userModel.findById(jwt_payload.id)
                    .then(user => {
                        if(user) {
                            return done(null, user);
                        } 
                        return done(null, false);
                    })
                    .catch(err => {
                        done(null, err);
                    })

        })
    )
}
