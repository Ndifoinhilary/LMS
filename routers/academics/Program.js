import express from "express";
import {isAdmin, isLoggin} from "../../middlewares/isLoggin.js";
import {
    createProgram,
    deleteProgram,
    getAllProgram,
    getProgram,
    updateProgram
} from "../../controller/acedemics/Program.js";


const ProgramRouter = express.Router();


ProgramRouter.get("/", isLoggin, getAllProgram);
ProgramRouter.get("/:id/", isLoggin, isAdmin, getProgram);
ProgramRouter.post('/create/', isLoggin, isAdmin, createProgram);
ProgramRouter.put('/:id/', isLoggin, isAdmin, updateProgram);
ProgramRouter.delete('/:id/', isLoggin, isAdmin, deleteProgram);

export default ProgramRouter;