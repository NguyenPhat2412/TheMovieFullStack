const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const movieRouter = require("./routes/movie");

// Router lấy movie trending
app.use("/api/movies", movieRouter);

// Router khi người dùng nhập sai Endpoint
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      "<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p>"
    );
});
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
