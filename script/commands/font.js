module.exports.config = {
  name: "font",
  description: "Font text",
  version: "9.0.2",
  hasPermission: 0,
  credits: "Deku",
  usage: "<text>",
  cooldowns: 10,
  commandCategory: "system"
};

module.exports.run = async function ({ api, event, args }) {
  const { get } = require('axios');
  try {
    let q = args.join(" ");
    if (!q) return api.sendMessage('Missing text!', event.threadID, event.messageID);
    const rest = (await get("https://joshweb.click/api/font?q=" + encodeURI(q))).data;
    const data = rest;
    let c = 0, msg = "";
    for (let i = 0; i < data.length; i++) {
      c += 1;
      msg += c + ". " + data[i].result + "\n";
    }
    return api.sendMessage(msg, event.threadID, event.messageID);
  } catch (e) {
    return api.sendMessage(`${error}`, event.threadID, event.messageID);
  }
};