import express from 'express';
import {
    deleteAdmin,
    getAdminProfile,
    getAllAdmin,
    login,
    register,
    updateAdmin
} from "../../controller/staff/adminController.js";
import {isAdmin, isLoggin} from "../../middlewares/isLoggin.js";

const adminRouter = express.Router();

// register an admin
adminRouter.post('/register/', register)

// login an admin
adminRouter.post('/login/', login)

//  admin profile
adminRouter.get('/me/', isLoggin, getAdminProfile)

// update an admin
adminRouter.put('/update/',isLoggin, isAdmin ,updateAdmin)
// get all the admins
adminRouter.get('/', isLoggin, isAdmin, getAllAdmin);

adminRouter.delete('/', isLoggin, isAdmin ,deleteAdmin);
export default adminRouter;