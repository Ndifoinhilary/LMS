import asyncHandler from "express-async-handler";
import AcademicYear, {validate} from "../../models/Academic/AcademicYear.js";
import {Admin} from "../../models/Staff/Admin.js";


export const createAcademicYear = asyncHandler(async (req, res) => {
    const {error, value} = validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const {name, fromYear, toYear, isCurrent} = value;
    const checkYear = await AcademicYear.findOne({name})
    if (checkYear) {
        throw new Error("Academic Year already exists");
    }
    const newYear = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        isCurrent,
        createdBy: req.user._id
    })
    // push the academic year to the admin array
    const admin = await Admin.findById(req.user._id)
    admin.academicYears.push(newYear._id)
    await admin.save()
    return res.status(200).json({
        success: true,
        message: 'Academic Year created successfully.',
        data: newYear
    });
})


export const getAllAcademicYear = asyncHandler(async (req, res) => {
    const allYears = await AcademicYear.find({})
    return res.status(200).json({
        success: true,
        data: allYears
    })
})


export const getAcademicYear = asyncHandler(async (req, res) => {
    const getYear = await AcademicYear.findById(req.params.id)
    if (!getYear) {
        throw new Error("The academic Year does not exist");
    }
    return res.status(200).json({
        success: true,
        data: getYear
    })
})

export const updateAcademicYear = asyncHandler(async (req, res) => {
    const {error, value} = validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const {name, fromYear, toYear, isCurrent} = value;
    const updateYear = await AcademicYear.findByIdAndUpdate(req.params.id, {
            name,
            fromYear,
            toYear,
            isCurrent,
            createdBy: req.user._id
        }, {
            new: true
        }
    )
    return res.status(200).json({
        success: true,
        data: updateYear
    })
})


export const deleteAcademicYear = asyncHandler(async (req, res) => {
    const year = await AcademicYear.findById(req.params.id)
    if (!year) {
        throw new Error("The academic Year does not exist");
    }
    const deleteResult = await year.deleteOne()
    if (deleteResult.deletedCount === 0) {
        throw new Error("Oops something went wrong. Please try again.");
    }
    return res.status(200).json({
        success: true,
        message: 'Academic Year deleted successfully.',
    })
})

