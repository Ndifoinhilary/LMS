import express from "express";
import {
    createAcademicYear, deleteAcademicYear,
    getAcademicYear,
    getAllAcademicYear, updateAcademicYear
} from "../../controller/acedemics/createAcademicYear.js";
import {isAdmin, isLoggin} from "../../middlewares/isLoggin.js";


const academicYearRouter = express.Router();


academicYearRouter.get("/", isLoggin, getAllAcademicYear);
academicYearRouter.get("/:id/", getAcademicYear);
academicYearRouter.post('/create/', isLoggin, isAdmin, createAcademicYear);
academicYearRouter.put('/:id/', isLoggin, isAdmin, updateAcademicYear);
academicYearRouter.delete('/:id/', isLoggin, isAdmin, deleteAcademicYear);

export default academicYearRouter;