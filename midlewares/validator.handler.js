import Boom from "@hapi/boom";

function validator(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      next(Boom.badRequest(error));
    }
    next();
  };
}

export { validator };
