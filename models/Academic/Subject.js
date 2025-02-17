import mongoose from "mongoose";
import Joi from "joi";

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
        academicTerm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicTerm",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        duration: {
            type: String,
            required: true,
            default: "3 months",
        },
    },
    { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);


export function validate(subject) {
   const schema  = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.string().required(),
    })

    return schema.validate(subject, { abortEarly: false });
}

export default Subject;