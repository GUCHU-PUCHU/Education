const path = require("path");
const axios = require("axios");
const fs = require("fs");

module.exports.config = {
 name: "eabab",
 version: "9",
 credits: "Eugene Aguilar",
 description: "Generate random shoti 😝",
 commandCategory: "media",
 hasPermssion: 0,
 cooldowns: 9,
 usages: "[shoti]",
};
module.exports.run = async function ({api, event }) {
try {
api.setMessageReaction("🕥", event.messageID, (err)  => {}, true);

  
const response = await axios.post(`https://shoti-api.replit.app/api/request/f`);
const video = response.data.data.eurixmp4;
const username = response.data.data.username;
const nickname = response.data.data.nickname;
const title = response.data.data.title;

const videoPath = path.join(__dirname, "cache", "shoti.mp4");



const videoResponse = await axios.get(video, { responseType: "arraybuffer" });

fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, "utf-8"));

api.setMessageReaction("✅", event.messageID, (err) =>  {}, true);

await api.sendMessage({body: `nag liliyab na bilat 💥\nUsername: ${username}\nNickname: ${nickname}\nTitle: ${title}`, attachment: fs.createReadStream(videoPath), }, event.threadID, event.messageID);
} catch (error) {
api.sendMessage(`error: ${error.message}`, event.threadID, event.messageID);
console.log(error);
}
};