import mongoose from "mongoose";
import Joi from "joi";

const ProgramSchema = new mongoose.Schema(
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
            default: "4 years",
        },
        // created automatically
        //CSFTY
        code: {
            type: String,
            default: function () {
                return (
                    this.name
                        .split(" ")
                        .map(name => name[0])
                        .join("")
                        .toUpperCase() +
                    Math.floor(10 + Math.random() * 90) +
                    Math.floor(10 + Math.random() * 90)
                );
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        //we will push the teachers that are in charge of the program
        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher",
            },
        ],
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
                default: [],
            },
        ],
        //we will push the subjects that are in the program when the program is created
        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject",
                default: [],
            },
        ],
    },
    { timestamps: true }
);
const Program = mongoose.model("Program", ProgramSchema);

export function validate(program) {
   const schema  = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.string().required(),
    })

    return schema.validate(program, { abortEarly: false });
}

export default Program;