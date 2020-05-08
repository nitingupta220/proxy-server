const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/cors", (req, res) => {
  var url = req.query.url
  request(
    { url: url },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
