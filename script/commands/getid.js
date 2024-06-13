const axios = require('axios');

module.exports.config = {
  name: "getid",
  description: "Get id of facebook profile",
  credits: "Eugene Aguilar",
  usages: "[]",
  hasPermssion: 0,
  commandCategory: "other",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(" ");
  if (!input) return api.sendMessage("Missing facebook profile link.", event.threadID, event.messageID);

  const result = await axios.get(`https://hiroshi-api-hub.replit.app/tool/uid?url=${encodeURIComponent(input)}`);
  const uid = result.data.uid.data;

  return api.sendMessage(uid, event.threadID, event.messageID);
}