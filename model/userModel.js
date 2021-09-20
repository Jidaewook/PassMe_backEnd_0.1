const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        avatar: {
            type: String
        },
        role: {
            type: String,
            default: 'user'
        },
        resetPasswordLink: {
            type: String,
            default: ""
        },
        source: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next){
    try{
        console.log('entered');

        const avatar = await gravatar.url(this.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        this.avatar = avatar;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        console.log('exited..');
        next();

    } catch(error){
        next(error)
    }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('user', userSchema);