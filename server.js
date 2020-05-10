const express = require("express");
const cors = require("cors");
const axios = require("axios");
const responseTime = require("response-time");
const redis = require("redis");

const PORT = process.env.PORT || 3005;

const app = express();
// create and connect redis client to local instance
const client = redis.createClient({
  url:
    "redis://h:pf86dc120b9a8253ee6a4a19580889893f8ae06dae26496d9ab2278063cd5372a@ec2-3-95-115-105.compute-1.amazonaws.com:16739",
});

app.use(cors());
app.use(responseTime());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/cors", (req, res) => {
  var url = req.query.url;
  return client.get(`data:${url}`, (err, result) => {
    if (result) {
      const resultJson = JSON.parse(result);
      console.log("result==>", resultJson);
      return res.status(200).json(resultJson);
    } else {
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          console.log("getting new data==>", data);
          client.setex(
            `data:${url}`,
            3600,
            JSON.stringify({ source: `Redis cache ${url}`, ...data })
          );
          return res
            .status(200)
            .json({ source: `Redis cache ${url}`, ...dataP });
        })
        .catch((err) => {
          return res.json(err);
        });
    }
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
