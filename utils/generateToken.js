import jwt from "jsonwebtoken";


export const generateToken = (_id) => {
    const privateKey = process.env.SECRET_KEY;
    return jwt.sign({_id}, privateKey, {"expiresIn": "1h"});
}


export const verifyToken = (token) => {
    try {
        const userToken = jwt.verify(token, process.env.SECRET_KEY);
        if (!userToken) {
            return null;
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        if (userToken.exp && userToken.exp < currentTime) {
            return null;
        }

        return userToken;
    } catch (error) {
        return null;
    }
};