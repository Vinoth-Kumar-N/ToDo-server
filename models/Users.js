const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
});


userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


const User = mongoose.model('Users', userSchema);
module.exports = User;