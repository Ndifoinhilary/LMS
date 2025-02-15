import express from 'express';
import {login, register} from "../../controller/staff/adminController.js";
const adminRouter = express.Router();

// register an admin
adminRouter.post('/register/',register)

// login an admin
adminRouter.post('/login/',login)

// update and admin
adminRouter.put('/update/:id/', (req, res) => {
     try {

    }
    catch(err) {
        console.log(err);
    }
})

// delete an admin
adminRouter.delete('/delete/:id/', (req, res) => {
     try {

    }
    catch(err) {
        console.log(err);
    }
})
// get all the admins
adminRouter.get('/', (req, res) => {
     try {

    }
    catch(err) {
        console.log(err);
    }
});

export default adminRouter;