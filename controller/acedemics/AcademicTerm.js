import asyncHandler from "express-async-handler";
import AcademicTerm, {validateTerm} from "../../models/Academic/AcademicTerm.js";




export const academicTermCreate = asyncHandler(async (req, res) => {
    const {error, value} = validateTerm(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const {name, description, duration} = value;
    const checkTerm = await AcademicTerm.findOne({name})
    if (checkTerm) {
        throw new Error("Academic Term already exists");
    }
    const term = await AcademicTerm.create({name, description, duration, createdBy: req.user._id});
    return res.status(200).json({
        success: true,
        message: "Academic Term created successfully",
        data: term

    })
})


export const academicTermUpdate = asyncHandler(async (req, res) => {

    const {name, description, duration} = req.body;
    const updateTerm = await AcademicTerm.findByIdAndUpdate(req.params.id,{
        name,
        description,
        duration,
        createdBy: req.user._id
    }, {new: true});
    return res.status(200).json({
        success: true,
        message: "Academic Term updated successfully",
        data: updateTerm
    })
})

export const academicTermDelete = asyncHandler(async (req, res) => {
    const term = await AcademicTerm.findById(req.params.id);
    if (!term) {
        throw new Error("Academic Term does not exist");
    }
    await term.deleteOne()
    return res.status(200).json({
        success: true,
        message: "Academic Term deleted successfully",
    })
})

export const getAcademicTerm = asyncHandler(async (req, res) => {
    const term = await AcademicTerm.findById(req.params.id);
    if (!term) {
        throw new Error("Academic Term does not exist");
    }
    return res.status(200).json({
        success: true,
        data: term
    })
})

export const getAllAcademicTerm = asyncHandler(async (req, res) => {
    const terms = await AcademicTerm.find({});
    return res.status(200).json({
        success: true,
        data: terms
    })
})