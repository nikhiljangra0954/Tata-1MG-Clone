const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        const userID = decoded.userID;
        // console.log(decoded);
        req.body.userID = userID;
        next();
      } else {
        res.send(`Please Login`);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error: "Invalid Token",
      });
    }
  } else {
    res.send(`Please Login`);
  }
};

module.exports = {
  authenticate,
};
