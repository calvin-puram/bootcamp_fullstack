const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const asyncHandler = require('./async');
const ErroResponse = require('../utils/errorResponse');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErroResponse('Not authorize to access this route ', 401));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);

    next();
  } catch (err) {
    console.log(err.message);
    return next(new ErroResponse('Not authorize to access this route', 409));
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErroResponse('you are not authorize to perform this action', 401)
      );
    }
    next();
  };
};
