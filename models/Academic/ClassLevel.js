import mongoose from "mongoose";
import Joi from "joi";


const ClassLevelSchema = new mongoose.Schema(
    {
        //level100/200/300/400
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        //students will be added to the class level when they are registered
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
        //optional.
        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject",
            },
        ],
        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
            },
        ],
    },
    { timestamps: true }
);

const ClassLevel = mongoose.model("ClassLevel", ClassLevelSchema);

export function validateClassLevel(classLevel) {
    const schema  = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    })

    return schema.validate(classLevel, { abortEarly: false });
}

export default ClassLevel;