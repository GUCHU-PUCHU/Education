const axios = require('axios');

module.exports.config = {
  name: "chesca",
  version: "9.0.2",
  hasPermssion: 0,
  credits: "Eugene Aguilar",
  description: "Talk with Chesca",
  commandCategory: "...",
  usages: "<ask>",
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const ask = args.join(" ");

    const response = await axios.get(`https://eurix-api.replit.app/chesca?ask=${encodeURIComponent(ask)}`);
    const mahal = response.data.message;
    api.sendMessage(mahal, event.threadID, event.messageID);
  } catch(error) {
    api.sendMessage(`Oops something went wrong!!`, event.threadID, event.messageID);
    console.log(error);
  }
};