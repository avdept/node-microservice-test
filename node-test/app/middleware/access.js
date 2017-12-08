import { verifyJWToken } from '../libs/auth';

const handleError = (res) => {
  res.status(401).json({ message: 'Access denied. You are not an admin' });
};

export const verifyJWT = (req, res, callback) => {
  let token = req.headers.authorization;
  if (typeof (token) === 'string') {
    [, token] = token.split(' ');
  }

  verifyJWToken(token)
    .then((decodedToken) => {
      req.user = decodedToken.data;
      return req.user.admin ? callback() : handleError(res);
    })
    .catch(() => {
      res.status(400)
        .json({ message: 'You are not authorized to visit this page.' });
    });
};

export const skipVerifyJWT = (_req, _res, next) => {
  next();
};

