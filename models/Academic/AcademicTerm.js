import mongoose from "mongoose";
import Joi from "joi";


const academicTermSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
            default: "3 months",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
    },
    { timestamps: true }
);

const AcademicTerm = mongoose.model("AcademicTerm", academicTermSchema);

export function validateTerm(academicTerm) {
    const schema  = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.string().required(),
    })

    return schema.validate(academicTerm, { abortEarly: false });
}

export default AcademicTerm;