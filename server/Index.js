const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const app = express();
const port = process.env.PORT || 5000;

app
  .use(cors())

  .get("/download", (req, res) => {
    const URL = req.query.URL;

    ytdl.getInfo(URL).then((info) => {
      const format = ytdl.filterFormats(info.formats, "audioonly");
      console.log("format", format);
      res.json(format[1].url);
    });
  })

  .listen(port, () => {
    console.log(`Server Works at ${port}`);
  });
