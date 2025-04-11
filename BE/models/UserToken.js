// tạo middleware xác thực cho các routes
const fs = require("fs");
const path = require("path");

class UserToken {
  constructor(id, token) {
    this.id = id;
    this.token = token;
  }

  // lấy danh sách token
  static getAllTokens() {
    const userTokenPath = path.join(__dirname, "..", "data", "userToken.json");
    const tokens = JSON.parse(fs.readFileSync(userTokenPath));
    return tokens.map((u) => new UserToken(u.id, u.token));
  }

  // kiểm tra token có hợp lệ hay không
  static isValidToken(token) {
    const tokens = UserToken.getAllTokens();
    return tokens.some((u) => u.token === token);
  }
}

module.exports = UserToken;
