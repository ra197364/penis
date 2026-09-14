import express from "express";
import authRouter from "./controllers/auth.js";
import produtosRouter from "./controllers/produtos.js";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import authMidleware from "./utils/authMidleware.js"

async function start(){
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(`${mongod.getUri()}/almoxarifado`);

    const app = express();

    app.use("/auth", authRouter);
    app.use("/products", authMidleware, produtosRouter);

    app.get("/health", (req, res) => {
        res.send({message: "It´s Alive"});
    })

    app.listen(3000, () =>{
        console.log("rodando na porta 3000");
    });
}

start();
