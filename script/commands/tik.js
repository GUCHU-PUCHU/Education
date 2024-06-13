const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "tik",
  version: "9.0.2",
  credits: "Eugene Aguilar",
  description: "Tiktok downloader",
  hasPermission: 0,
  usages: "tik [link]",
  cooldowns: 10,
  commandCategory: "media"
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const img = "https://i.imgur.com/Q6Fzt3K.jpeg";
    const imgPath = path.join(__dirname, "cache", "helptik.jpg");

    const imgRes = await axios.get(img, {
      responseType: "arraybuffer"
    });

    fs.writeFileSync(imgPath, Buffer.from(imgRes.data));

    const link = args.join(" ");
    if (!link) {
      return api.sendMessage({
        body: `${global.config.PREFIX}tik [link]`,
        attachment: fs.createReadStream(imgPath)
      }, event.threadID, event.messageID);
    }

    const response = await axios.get(`https://eurix-api.replit.app/tikdl?link=${encodeURIComponent(link)}`);
    const data = response.data.data;

    if (!data) {
      return api.sendMessage("Error: Invalid response from TikTok API", event.threadID, event.messageID);
    }

    const video = data.url;
    const username = data.username;
    const nickname = data.nickname;
    const title = data.title;
    const images = data.images;

    if (images) {
      const img = [];
      for (let i = 0; i < images.length; i++) {
        const imagePath = path.join(__dirname, "cache", `${i}.jpg`);
        const imgResponse = await axios.get(images[i], { responseType: "arraybuffer" });
        fs.writeFileSync(imagePath, Buffer.from(imgResponse.data, "utf-8"));
        img.push(fs.createReadStream(imagePath));
        
      } 
      api.sendMessage({ body: `Downloaded successfully\n\nUsername: @${username}\nNickname: ${nickname}\nTitle: ${title}`, attachment: img }, event.threadID, event.messageID);
    }


    const videoPath = path.join(__dirname, "cache", "tiktok.mp4");
    const videoResponse = await axios.get(video, { responseType: "arraybuffer" });
    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, "utf-8"));

    await api.sendMessage({
      body: `Downloaded Successfully\n\nUsername: @${username}\nNickname: ${nickname}\nTitle: ${title}`,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage(`${error.message}`, event.threadID, event.messageID);
    console.error(error);
  }
};