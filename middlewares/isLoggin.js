import {verifyToken} from "../utils/generateToken.js";


export const isLoggin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized token',
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
    } catch (error) {
        return res.status(401).json({success: false, error: "Authentication failed"});
    }
}