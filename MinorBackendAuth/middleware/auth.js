
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.cookies);
  const authHeader = req.header("Authorization");
  const token =
    req.cookies.token ||
    req.body.token ||
    (authHeader && authHeader.replace('Bearer ', ''));

  if (!token) {
    return res.status(403).render("404");
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode);
    req.user = decode;
  
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

module.exports = auth;
