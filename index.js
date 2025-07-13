const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send("Missing 'url' parameter");

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return res.status(500).send("Image fetch failed");

    const contentType = response.headers.get("content-type");
    res.set("Content-Type", contentType);

    const buffer = await response.buffer();
    res.send(buffer);
  } catch (err) {
    res.status(500).send("Error fetching image");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
