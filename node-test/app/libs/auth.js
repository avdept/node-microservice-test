import jwt from 'jsonwebtoken';

export const verifyJWToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
};

export const createJWToken = (details) => {
  const token = jwt.sign({
    data: details,
  }, process.env.JWT_SECRET, {
    expiresIn: 3600,
    algorithm: 'HS256',
  });

  return token;
};
