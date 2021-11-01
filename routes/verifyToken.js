const jwt = require('jsonwebtoken');

// 1. Helper Func to verify user token
// 2. User is passed as a props

// HAS TO BE LOGGED
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    // GET Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) res.status(403).json('Token is not valid');
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json('You are not authenticated');
  }
};

// HAS TO BE LOGGED && OWNER
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not authorized');
    }
  });
};

// HAS TO BE ADMIN
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not authorized');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};
