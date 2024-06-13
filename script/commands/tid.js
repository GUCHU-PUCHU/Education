module.exports.config = {
  name: "tid",
  version: "9.0",
  hasPermission: 0,
  credits: "Eugene Aguilar",
  description: "tid box",
  commandCategory: "system",
  usages: "tid",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { sendMessage: reply } = api;

  reply(`tid: ${event.threadID}`, event.threadID, event.messageID);
};