// @dec register an admin
// @router /register/
import {Admin, validate,validateLogin} from "../../models/Staff/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const {error, value} = validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const {name, email, password} = value;
        const admin = await Admin.findOne({email});
        if (admin) {
            return res.status(400).json({
                success: false,
                error: 'Email already exists',
            });
        }
        const newAdmin = await Admin.create({name, email, password});

        return res.status(201).json({
            success: true,
            data: newAdmin
        })

    } catch (error) {
        console.error("Registration Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
            error: error.message,
        });
    }

}


// @dec login an admin
// @router /login/
export const login = async (req, res) => {

    try {
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
        const privateKey = process.env.SECRET_KEY;
        const token = jwt.sign({_id:user._id}, privateKey, {"expiresIn": "1h"});
        return res.status(200).json({
            success: true,
            token: token,
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
            error: error.message,
        })
    }
}

// @dec get  an admin
// @router /:id/
export const getAdmin = (req, res) => {

}

// @dec get all  admin
// @router /
export const getAllAdmin = (req, res) => {

}

// @dec update an admin
// @router /update/:id/
export const updateAdmin = (req, res) => {

}


// @dec delete an admin
// @router /delete/:id/
export const deleteAdmin = (req, res) => {

}


