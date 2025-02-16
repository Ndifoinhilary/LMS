import {verifyToken} from "../utils/generateToken.js";
import {Admin} from "../models/Staff/Admin.js";
import asyncHandler from "express-async-handler";


export const isLoggin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Token not provided',
            })
        }

        const token = authHeader.split(' ')[1];
        const verify = verifyToken(token);
        if (!verify) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token',
            })
        }
        req.user = verify;
        next()
    } catch (error) {
        return res.status(401).json({success: false, error: "Authentication failed"});
    }
}


export const isAdmin =asyncHandler( async (req, res, next) => {
   if (!req.user) {
       return res.status(401).json({
           success: false,
           error: 'Unauthorized access Please login',
       })
   }
   const user = await Admin.findById(req.user._id);
   if (!user) {
       return res.status(401).json({
           success: false,
           error: 'User not found',
       })
   }
   if (user.role !== 'admin') {
       return res.status(403).json({
           success: false,
           error: 'Access denied. Admins only',
       })
   }
   next()

})