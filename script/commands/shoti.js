const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
 name: "shoti",
 version: "1.0.0",
 credits: "Eugene Aguilar && api by Jan liby de Costa",
 hasPermssion: 0,
 commandCategory: "fun",
 description: "Generate Random shoti (:",
 usages: "shoti",
 cooldowns: 9,
};
module.exports.run = async function ({api, event }) {
try {
api.sendMessage(`🕥 shoti is sending please wait master`, event.threadID, event.messageID);

     const response = await axios.post(`https://eurix-api.replit.app/shoti`);
  const username = response.data.username;
const nickname = response.data.nickname;
const url = response.data.url;

let shotiPath = path.join(__dirname, "cache", "shoti.mp4");

const video = await axios.get(url, { responseType: "arraybuffer" });

fs.writeFileSync(shotiPath, Buffer.from(video.data, "utf-8"));

await api.sendMessage({body: `Here's your shoti master\n\nUsername: ${username}\nNickname: ${nickname}`, attachment: fs.createReadStream(shotiPath) }, event.threadID, event.messageID);
} catch (error) {
api.sendMessage(`${error}`, event.threadID, event.messageID);
}
};