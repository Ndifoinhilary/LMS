// @dec register an admin
// @router /register/
import {Admin, validate, validateLogin} from "../../models/Staff/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import {generateToken, hashPassword} from "../../utils/generateToken.js";


export const register = asyncHandler(async (req, res) => {
    const {error, value} = validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    const {name, email, password} = value;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.findOne({email});
    if (admin) {
        return res.status(400).json({
            success: false,
            error: 'Email already exists',
        });
    }
    const newAdmin = await Admin.create({name, email, password: hashPassword});

    return res.status(201).json({
        success: true,
        message: "Register successfully",
        data: newAdmin
    })
})


// @dec login an admin
// @router /login/
export const login = asyncHandler(async (req, res) => {

    const {error, value} = validateLogin(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message,
        });
    }
    const {email, password} = value;
    const user = await Admin.findOne({email})
    if (!user) {
        return res.status(400).json({
            success: false,
            error: 'Email does not exist exists',
        })
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(400).json({
            success: false,
            error: 'Password does not match',
        })
    }
    const token = generateToken(user._id);
    return res.status(200).json({
        success: true,
        message: "Successfully logged in",
        token: token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    })

})

// @dec get  an admin
// @router /:id/
export const getAdminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id).select('-password -createdAt -updatedAt')
    if (!admin) {
        return res.status(404).json({
            success: false,
            error: 'Admin does not exist',
        })
    }
    return res.status(200).json({
        success: true,
        data: admin
    })
})


// @dec get all  admin
// @router /
export const getAllAdmin = asyncHandler(async (req, res) => {
    const admins = await Admin.find({}).select('-password -createdAt -updatedAt')
    return res.status(200).json({
        success: true,
        data: admins
    })
})

// @dec update an admin
// @router /update/
export const updateAdmin = asyncHandler(async (req, res) => {
    const {error, value} = validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message,
        })
    }
    const {name, email, password} = value;
    const existEmail = await Admin.findOne({email})
    if (existEmail) {
        throw new Error("Email already exists");
    }
    if (password) {
        const passwordHash = await hashPassword(password)
        const admin = await Admin.findByIdAndUpdate(req.user._id, {
            name,
            email,
            password: passwordHash
        }, {
            new: true,
            runValidators: true
        });
        return res.status(200).json({
            success: true,
            data: admin,
            message: "Successfully updated",

        })
    }
    const admin = await Admin.findByIdAndUpdate(req.user._id, {
        name,
        email
    }, {
        new: true,
        runValidators: true
    });
    return res.status(200).json({
        success: true,
        data: admin,
        message: "Successfully updated",

    })

})


// @dec delete an admin
// @router /delete/:id/
export const deleteAdmin = asyncHandler(async (req, res) => {

})


