const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    image: {
        secure_url: { type: String, default: '/images/default-profile.jpg'},
        public_id: String
    }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)