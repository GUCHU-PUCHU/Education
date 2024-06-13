const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports.config = {
  name: "ss",
  version: "1.0.0",
  description: "Take a screenshot of a website",
  credits: "Eugene Aguilar",
  usages: "[url]",
  hasPermssion: 0,
  cooldowns: 10,
  commandCategory: "utility", 
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const link = args.join(" ");
    if (!link) {
      return api.sendMessage(`${global.config.PREFIX}ss <url>`, event.threadID, event.messageID);
    }

    const response = await axios.get(`https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/${link}`, { responseType: "arraybuffer" });
    const img = response.data;

    const imgPath = path.join(__dirname, "cache", "screenshot.png");

    fs.writeFileSync(imgPath, Buffer.from(img, "utf-8"));

    await api.sendMessage({body: ``, attachment: fs.createReadStream(imgPath), }, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
    console.error(error);
  }
};