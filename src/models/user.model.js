const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/baseConfig');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(config.SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.createToken = async function() {
  return jwt.sign({ id: this._id }, config.SECRET, {
      expiresIn: 86400,
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;