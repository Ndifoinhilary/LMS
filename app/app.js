import express  from "express"
import morgan  from "morgan"
import adminRouter from "../routers/staff/adminRouter.js";
import {GlobalErrorHandle, NotFound} from "../middlewares/globalErrorHandle.js";
import academicYearRouter from "../routers/academics/AcademicYear.js";
import academicTermRouter from "../routers/academics/AcademicTerm.js";
import classLevelRouter from "../routers/academics/ClassLevel.js";
import ProgramRouter from "../routers/academics/Program.js";
import SubjectRouter from "../routers/academics/subject.js";


const app = express()

// =====Middleware here with morgan======

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// routers
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/academic-year', academicYearRouter)
app.use('/api/v1/academic-term', academicTermRouter)
app.use('/api/v1/class-level', classLevelRouter)
app.use('/api/v1/program', ProgramRouter)
app.use('/api/v1/subject', SubjectRouter)


// error handles middleware
app.use(NotFound)
app.use(GlobalErrorHandle);

export default app;