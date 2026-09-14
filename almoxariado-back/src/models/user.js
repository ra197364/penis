import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: String
});

const User = mongoose.model("User", userSchema);

export default User;