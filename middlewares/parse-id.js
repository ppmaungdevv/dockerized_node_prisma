import CustomError from '../configs/custom-error.js'

const parseIdParam = (req, res, next) => {
  const { id } = req.params;
  const parsedId = Number(id, 10);
  if (isNaN(parsedId)) {
    throw new CustomError({ message: "Invalid ID", statusCode: 400 })
  }
  req.params.id = parsedId;
  next();
};

export {
  parseIdParam
}