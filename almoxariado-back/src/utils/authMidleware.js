import express from "express";
import {jwtDecrypt} from "jose";
import User from "../models/user.js";

const secret = new TextEncoder().encode(
    'MinhaSuperSECRET',
)

const authMidleware = async (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) {
        res.status(401).send({message: "Você nao pode entrar!"})
    }
    const { userData, protectedHeader } = await jwtDecrypt(token, secret, {});

    const user = await User.findById(userData.userId);

    if(user) {
        req.currentUser = user;
        next()
    } else {
        res.status(401).send({message: "Você nao pode entrar!"})
    }
}

export default authMidleware;