const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports.config = {
  name: "ai",
  version: "9.0.2",
  credits: "Eugene Aguilar",
  description: "GPT-4 conversational bot. Please use responsibly.",
  usages: "[ask]",
  commandCategory: "ai",
  hasPermssion: 0,
  cooldowns: 9,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const message = event.messageReply ? event.messageReply.body : args.join(" ");
    const img = path.join(__dirname, "cache", "ai.png");

    if (!message) {
      return api.sendMessage(
        {
          body: `${global.config.PREFIX}ai <ask>`,
          attachment: fs.createReadStream(img),
        },
        event.threadID,
        event.messageID
      );
    }

    const res = await axios.get(`https://eurix-api.replit.app/gpt4`, {
      params: {
        ask: message,
        id: event.senderID,
      },
    });

    const answer = res.data.eurix || "No response from GPT-4.";
    api.sendMessage(answer, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("Error fetching GPT-4 API", event.threadID, event.messageID);
    console.error(error);
  }
};