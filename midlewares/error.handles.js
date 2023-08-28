import Boom from "@hapi/boom";

function logsError(err, req, res, next) {
  console.log("logserror");
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log("errorHandler");
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (Boom.isBoom(err)) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

export { logsError, errorHandler, boomErrorHandler };
