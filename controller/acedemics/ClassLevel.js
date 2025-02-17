import asyncHandler from "express-async-handler";
import ClassLevel, {validateClassLevel} from "../../models/Academic/ClassLevel.js";




export const cassLevelCreate = asyncHandler(async (req, res) => {
    const {error, value} = validateClassLevel(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const {name, description} = value;
    const checkTerm = await ClassLevel.findOne({name})
    if (checkTerm) {
        throw new Error("Academic Term already exists");
    }
    const term = await ClassLevel.create({name, description, createdBy: req.user._id});
    return res.status(200).json({
        success: true,
        message: "Academic Term created successfully",
        data: term

    })
})


export const classLevelUpdate = asyncHandler(async (req, res) => {

    const {name, description} = req.body;
    const updateTerm = await ClassLevel.findByIdAndUpdate(req.params.id,{
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

export const classLevelDelete = asyncHandler(async (req, res) => {
    const term = await ClassLevel.findById(req.params.id);
    if (!term) {
        throw new Error("Academic Term does not exist");
    }
    await term.deleteOne()
    return res.status(200).json({
        success: true,
        message: "Academic Term deleted successfully",
    })
})

export const getClassLevel = asyncHandler(async (req, res) => {
    const term = await ClassLevel.findById(req.params.id);
    if (!term) {
        throw new Error("Academic Term does not exist");
    }
    return res.status(200).json({
        success: true,
        data: term
    })
})

export const getAllClassLevel = asyncHandler(async (req, res) => {
    const terms = await ClassLevel.find({});
    return res.status(200).json({
        success: true,
        data: terms
    })
})