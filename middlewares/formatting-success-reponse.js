export const responseFormattingMiddleware = (req, res, next) => {
  res.formattedResponse = (data = null, message = 'Success') => {
    res.status(200).json({
      status: 'success',
      message,
      data,
    });
  };
  next();
};
