import asyncHandler from "express-async-handler";
import Program , {validate}from "../../models/Academic/Program.js";




export const createProgram = asyncHandler(async (req, res) => {
    const {error, value} = validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const {name, description, duration} = value;
    const checkProgram = await Program.findOne({name})
    if (checkProgram) {
        throw new Error("Academic Term already exists");
    }
    const term = await Program.create({name, description, duration, createdBy: req.user._id});
    return res.status(200).json({
        success: true,
        message: "Academic Term created successfully",
        data: term

    })
})


export const updateProgram = asyncHandler(async (req, res) => {

    const {name, description, duration} = req.body;
    const programUpdate = await Program.findByIdAndUpdate(req.params.id,{
        name,
        description,
        duration,
        createdBy: req.user._id
    }, {new: true});
    return res.status(200).json({
        success: true,
        message: "Program  updated successfully",
        data: programUpdate
    })
})

export const deleteProgram = asyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);
    if (!program) {
        throw new Error("Academic Term does not exist");
    }
    await program.deleteOne()
    return res.status(200).json({
        success: true,
        message: "Academic Term deleted successfully",
    })
})

export const getProgram = asyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);
    if (!program) {
        throw new Error("Program  does not exist");
    }
    return res.status(200).json({
        success: true,
        data: program
    })
})

export const getAllProgram = asyncHandler(async (req, res) => {
    const programs = await Program.find({});
    return res.status(200).json({
        success: true,
        data: programs
    })
})