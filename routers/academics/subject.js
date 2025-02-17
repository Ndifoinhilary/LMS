import express from "express";
import {isAdmin, isLoggin} from "../../middlewares/isLoggin.js";
import {
    createProgram,
    deleteProgram,
    getAllProgram,
    getProgram,
    updateProgram
} from "../../controller/acedemics/Program.js";
import Subject from "../../models/Academic/Subject.js";
import {
    createSubject,
    deleteSubject,
    getAllSubject,
    getSubject,
    updateSubject
} from "../../controller/acedemics/subject.js";


const SubjectRouter = express.Router();

// Get all subjects for a specific term
SubjectRouter.get("/:termId/", isLoggin, getAllSubject);

// Get a single subject by its ID for a specific term
SubjectRouter.get("/:termId/subject/:id/", isLoggin, isAdmin, getSubject);

// Create a new subject under a specific academic term
SubjectRouter.post('/:termId/create/', isLoggin, isAdmin, createSubject);

// Update an existing subject under a specific academic term
SubjectRouter.put('/:termId/update/:id/subject/', isLoggin, isAdmin, updateSubject);

// Delete a subject under a specific academic term
SubjectRouter.delete('/:termId/subject/:id/', isLoggin, isAdmin, deleteSubject);


export default SubjectRouter;