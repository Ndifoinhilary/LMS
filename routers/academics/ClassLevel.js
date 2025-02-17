import express from "express";
import {isAdmin, isLoggin} from "../../middlewares/isLoggin.js";
import {
    cassLevelCreate,
    classLevelDelete,
    classLevelUpdate, getAllClassLevel,
    getClassLevel
} from "../../controller/acedemics/ClassLevel.js";


const classLevelRouter = express.Router();

classLevelRouter.get("/", isLoggin, getAllClassLevel);
classLevelRouter.get("/:id/", getClassLevel);
classLevelRouter.post('/create/', isLoggin, isAdmin, cassLevelCreate);
classLevelRouter.put('/:id/', isLoggin, isAdmin, classLevelUpdate);
classLevelRouter.delete('/:id/', isLoggin, isAdmin, classLevelDelete);

export default classLevelRouter;