import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Joi from "joi";


const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "admin",
        },
        academicTerms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicTerm",
            },
        ],
        programs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Program",
            },
        ],
        yearGroups: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "YearGroup",
            },
        ],
        academicYears: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AcademicYear",
            },
        ],
        classLevels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ClassLevel",
            },
        ],
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
            },
        ],
    },
    {
        timestamps: true,
    }
);

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//model
export const Admin = mongoose.model("Admin", adminSchema);

export function validate(admin) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(admin, { abortEarly: false });
}

export function validateLogin(admin){
     const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(admin, { abortEarly: false });
}

