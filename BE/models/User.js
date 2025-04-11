const fs = require("fs");
const path = require("path");

// tạo model cho userToken.json
module.exports = class userToken {
  constructor(id, token) {
    this.id = id;
    this.token = token;
  }
  // lấy danh sách user
  static getAllUsers() {
    const userTokenPath = path.join(__dirname, "..", "data", "userToken.json");
    const users = JSON.parse(fs.readFileSync(userTokenPath));
    return users.map((u) => new userToken(u.id, u.token));
  }
};
