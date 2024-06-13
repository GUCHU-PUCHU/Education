const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports.config = {
  name: "tiksearch",
  version: "9.0.1",
  hasPermssion: 0,
  credits: "Eugene Aguilar",
  description: "Search for Tiktok videos",
  commandCategory: "media",
  usages: "[search]",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const search = args.join(" ");
    if (!search) {
      api.sendMessage(`${global.config.PREFIX}tiksearch [search]`, event.threadID, event.messageID);
return;
    }

api.sendMessage(`🕥 searching tiktok for ${search}`, event.threadID, event.messageID);

    const response = await axios.get(`https://eurix-api.replit.app/tiksearch?search=${encodeURIComponent(search)}`);
    const video = response.data.data.videos[0].play;
    const username = response.data.data.videos[0].author.unique_id;
    const nickname = response.data.data.videos[0].author.nickname;
    const title = response.data.data.videos[0].title;

    let videoPath = path.join(__dirname, "cache", "tiksearch.mp4");

    const t = await axios.get(video, { responseType: "arraybuffer" });

    fs.writeFileSync(videoPath, Buffer.from(t.data, "utf-8"));


    await api.sendMessage({ body: `Username ${username}\nNickname ${nickname}\nTitle ${title}`, attachment: fs.createReadStream(videoPath)  }, event.threadID,  event.messageID);

  } catch (error) {
    api.sendMessage(`${error}`, event.threadID, event.messageID);
    console.log(error);
  }
};