const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.post("/paystack/webhook", (req, res) => {
  const event = req.body;
  console.log(event);

  console.log(res);

  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
