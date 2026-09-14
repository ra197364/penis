import express from "express";
import User from "../models/user.js";
import {SignJWT} from 'jose';

const secret = new TextEncoder().encode(
    'MinhaSuperSECRET',
)

const authRouter = express.Router();

authRouter.post("/sign-up", async (req,res) => {
    const {
        name,
        email,
        password,
        role
    } = req;

    const user = await User.create({name,email,password,role})

    res.send(user);
});

authRouter.post("/sign-in", async(req,res) => {
    const {
        email,
        password
    } = req;

    user = await User.find({
        email: email,
        password: password
    });
    if(!user){
        res.status(403).send({error: "Usuario ou senha incorretos"})
    }

    const token = await new SignJWT({ 'userId': user.id }).sign(secret);
    res.send({token});
})

export default authRouter;