const UserToken = require("../models/UserToken");

function authenticateToken(req, res, next) {
  // lấy token từ query string hoặc header
  const token = req.query.token || req.headers["authorization"];

  // kiểm tra token có hợp lệ hay không
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isValid = UserToken.isValidToken(token);
  if (!isValid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // nếu token hợp lệ thì cho phép tiếp tục
  next();
}

module.exports = authenticateToken;
