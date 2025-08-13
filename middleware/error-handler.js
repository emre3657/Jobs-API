// const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  // Default Error
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };

  // if (customError instanceof CustomAPIError) {
  //   res.status(customError.statusCode).json({ msg: customError.msg });
  // }

  // Cast Error
  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = `Invalid ID format: ${err.value}`;
  }

  // ValidationError
  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // Duplicate Error
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    customError.statusCode = StatusCodes.CONFLICT;
    customError.msg = `Duplicated value entered for '${field}'`;
  }

  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
