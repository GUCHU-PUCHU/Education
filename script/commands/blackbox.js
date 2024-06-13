const axios = require('axios');

module.exports.config = {
  name: "blackbox",
  version: "9",
  hasPermssion: 0,
  credits: "Eugene Aguilar",
  description: "ai powered by blackbox",
  commandCategory: "ai",
  cooldowns: 0,
};
module.exports.run = async function ({api, event, args }) {

  try {
    const ask = args.join(" ");

    if (!ask) {
      api.sendMessage(`Please enter a question.`, event.threadID, event.messageID);
      return;
    }

    api.sendMessage(`answering, please wait a minute...`, event.threadID, event.messageID);

    const response = await axios.get(`https://api.easy-api.online/api/blackbox?query=${encodeURIComponent(ask)}`);
    const ans = response.data.response;
    api.sendMessage(ans, event.threadID, event.messageID);
  } catch (e) {
    api.sendMessage(`Error fetching blackbox API!!\n${e}`, event.threadID, event.messageID);
  }
};

