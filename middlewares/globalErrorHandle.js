


export const GlobalErrorHandle = (err, req,res, next) => {
    const stack = err.stack;
    const status = err.status? err.status : "FAILED";
    const message = err.message;
    const statusCode = err.statusCode || 500;

     res.status(statusCode).json({
        status,
        message,
        stack
    })
}

export const NotFound = (req,res,next) => {
    const err = new Error(`Not Found: ${req.originalUrl}`);
    err.status = 404;
    res.status(404);
    next(err);
}