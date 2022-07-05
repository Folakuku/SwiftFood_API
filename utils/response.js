const successMsg = (res, message, data, statusCode = 200) => {
  res.status(statusCode).json({
    status: true,
    message,
    data,
  });
};

const errorMsg = (res, message, statusCode = 400, error) => {
  if (error) {
    return res.status(statusCode).json({
      status: false,
      message,
      error,
    });
  }
  return res.status(statusCode).json({
    status: false,
    message,
  });
};

module.exports = { successMsg, errorMsg };
