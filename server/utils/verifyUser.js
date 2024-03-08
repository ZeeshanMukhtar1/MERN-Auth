import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { errorHandler } from './error.js';

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return next(
      errorHandler(401, 'You are not authorized to perform this action')
    );

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Invalid token'));
    req.user = user;
    next();
  });
};
