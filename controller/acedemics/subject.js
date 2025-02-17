import asyncHandler from "express-async-handler";
import Subject, {validate} from "../../models/Academic/Subject.js";
import AcademicTerm from "../../models/Academic/AcademicTerm.js";


export const createSubject = asyncHandler(async (req, res) => {
    const {error, value} = validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const {name, description, duration} = value;
    const term = await AcademicTerm.findById(req.params.termId);
    if (!term) {
        throw new Error("Academic Term not found");
    }
    const checkProgram = await Subject.findOne({name, academicTerm: term._id})
    if (checkProgram) {
        throw new Error("Subject already exists");
    }
    const subject = await Subject.create({
        name,
        description,
        duration,
        createdBy: req.user._id,
        academicTerm: term._id
    });
    term.subject.push(subject._id);
    await term.save()
    return res.status(200).json({
        success: true,
        message: "Subject  created successfully",
        data: subject

    })
})


export const updateSubject = asyncHandler(async (req, res) => {

    const {name, description, duration} = req.body;
    const term = await AcademicTerm.findById(req.params.termId);
    if (!term) {
        throw new Error("Academic Term not found");
    }
    const subjectUpdated = await Subject.findOneAndUpdate({_id: req.params._id, academicTerm: term._id}, {
        name,
        description,
        duration,
        createdBy: req.user._id,
        academicTerm: term._id
    }, {new: true});
    return res.status(200).json({
        success: true,
        message: "Subject  updated successfully",
        data: subjectUpdated
    })
})

export const deleteSubject = asyncHandler(async (req, res) => {
    const term = await AcademicTerm.findById(req.params.termId);
    if (!term) {
        throw new Error("Academic Term not found");
    }
    const subjectDelete = await Subject.findOne({_id: req.params.id, academicTerm: term._id});
    if (!subjectDelete) {
        throw new Error("Subject  does not exist");
    }

    await subjectDelete.deleteOne()
    return res.status(200).json({
        success: true,
        message: "Subject  deleted successfully",
    })
})


// Get a single subject by ID for a specific academic term
export const getSubject = asyncHandler(async (req, res) => {
    const term = await AcademicTerm.findById(req.params.termId);
    if (!term) {
        throw new Error("Academic Term not found");
    }
    const subject = await Subject.findOne({_id: req.params.id, academicTerm: term._id});
    if (!subject) {
        throw new Error("Subject  does not exist");
    }
    return res.status(200).json({
        success: true,
        data: subject
    })
})

// Get all subjects for a specific academic term
export const getAllSubject = asyncHandler(async (req, res) => {
    const subjects = await Subject.find({academicTerm: req.params.termId});
    if (!subjects) {
        throw new Error("No subjecst  were found");
    }
    return res.status(200).json({
        success: true,
        data: subjects
    })
})