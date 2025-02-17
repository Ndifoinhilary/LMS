import express from "express";
import {isAdmin, isLoggin} from "../../middlewares/isLoggin.js";
import {
    academicTermCreate, academicTermDelete,
    academicTermUpdate,
    getAcademicTerm,
    getAllAcademicTerm
} from "../../controller/acedemics/AcademicTerm.js";


const academicTermRouter = express.Router();

academicTermRouter.get("/", isLoggin, getAllAcademicTerm);
academicTermRouter.get("/:id/", getAcademicTerm);
academicTermRouter.post('/create/', isLoggin, isAdmin, academicTermCreate);
academicTermRouter.put('/:id/', isLoggin, isAdmin, academicTermUpdate);
academicTermRouter.delete('/:id/', isLoggin, isAdmin, academicTermDelete);

export default academicTermRouter;