// const errorHandler = (err, req, res, next) => {
//   res.status(err.status || 500).json({
//     message: err.message,
//   });
// };
// export default errorHandler;


class errorHandler extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default errorHandler;
