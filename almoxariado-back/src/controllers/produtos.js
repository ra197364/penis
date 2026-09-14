import express from "express";

const produtosRouter = express.Router();

produtosRouter.get("/", (req, res) => {
    res.send({message: "Voce esta numa area restrita parabens!"});
})

export default produtosRouter;