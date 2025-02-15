import express  from "express"
import morgan  from "morgan"
import adminRouter from "../routers/staff/adminRouter.js";


const app = express()

// =====Middleware here with morgan======

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/admin', adminRouter);

export default app;