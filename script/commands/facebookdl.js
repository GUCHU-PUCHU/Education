const fs = require("fs");
const path = require("path");
const axios = require("axios");


module.exports.config = {
  name: "fbdl",
  version: "9.0.1",
  credits: "Eugene Aguilar",
  description: "A simple Facebook video downloader",
  usages: "[link]",
  hasPermssion: 0,
  commandCategory: "media",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const link = args.join(" ");
    if (!link) {
      api.sendMessage(`${global.config.PREFIX}fbdl <url>`, event.threadID, event.messageID);
      return;
    }

    api.sendMessage(`🕥 Video is downloading. Please wait a minute...`, event.threadID, event.messageID);

    const res = await axios.get(`https://eurix-api.replit.app/fbdl?url=${encodeURIComponent(link)}`);
    const sd = res.data.sd
    const title = res.data.title;

    const video = await axios.get(sd, { responseType: "arraybuffer" });

    const videoPath = path.join(__dirname, "cache", `fbdl.mp4`);

    fs.writeFileSync(videoPath, Buffer.from(video.data, "utf-8"));

    await api.sendMessage({ body: `Downloaded successfully\n\nTitle: ${title}`, attachment: fs.createReadStream(videoPath) }, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage(`Error downloading the video. Please try again later.`, event.threadID, event.messageID);
    console.log(error);
  }
};