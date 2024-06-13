const axios = require("axios");

module.exports.config = {
  name: "jea",
  version: "9.0.5",
  hasPermssion: 0,
  credits: "Eugene Aguilar",
  description: "Talk with jea",
  commandCategory: "...",
  usages: "<ask>",
  cooldowns: 0,
};
module.exports.run = async function ({api, event, args}) {
try {
const prompt = args.join(" ");
if(!prompt) {
return api.sendMessage(`${global.config.PREFIX}jea <ask>`, event.threadID, event.messageID);
}

const response = await axios.get(`https://eurix-api.replit.app/jea?ask=${encodeURIComponent(prompt)}`);
const result = response.data.message;
api.sendMessage(result, event.threadID, event.messageID);
} catch(error) {
api.sendMessage(`Oops something went wrong!!`, event.threadID, event.messageID);
console.log(error);
}
};