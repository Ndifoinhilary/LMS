import express  from "express"
import morgan  from "morgan"
import adminRouter from "../routers/staff/adminRouter.js";
import {GlobalErrorHandle, NotFound} from "../middlewares/globalErrorHandle.js";
import {isLoggin} from "../middlewares/isLoggin.js";


const app = express()

// =====Middleware here with morgan======

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// routers
app.use('/api/v1/admin', adminRouter);



// error handles middleware
app.use(NotFound)
app.use(GlobalErrorHandle);

export default app;