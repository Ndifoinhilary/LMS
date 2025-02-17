import mongoose from "mongoose";
import Joi from "joi";

const academicYearSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        fromYear: {
            type: Date,
            required: true,
        },
        toYear: {
            type: Date,
            required: true,
        },
        isCurrent: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
            },
        ],
        //Finance
        //Librarian
        //......
    },
    {
        timestamps: true,
    }
);

//model
const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);

export function validate(academicYear) {
    const schema = Joi.object({
        name: Joi.string().required(),
        fromYear: Joi.date().required(),
        toYear: Joi.date().greater(Joi.ref('fromYear')).required(),
        isCurrent: Joi.boolean(),
    })
    return schema.validate(academicYear, {abortEarly: false});
}

export default AcademicYear;