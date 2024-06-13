const fs = require("fs");
const path = require("path");
const axios = require("axios");

const autoreactPath = path.join(__dirname, "cache", "autoreact.json");

let isEnabled = fs.existsSync(autoreactPath) ? JSON.parse(fs.readFileSync(autoreactPath)) : false;

module.exports.config = {
   name: "autoreact",
   version: "9.0.5",
   hasPermssion: 0,
   credits: "Eugene Aguilar",
   description: "Automatically reacts to messages containing specific keywords",
   commandCategory: "fun",
   usages: "autoreact [on/off]",
   cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  try {
      if (args[0] === "off") {
          isEnabled = false;
          fs.writeFileSync(autoreactPath, JSON.stringify(isEnabled, null, 2)); 
          return api.sendMessage("Auto react is now turned off", event.threadID, event.messageID);
      } else if (args[0] === "on") {
          isEnabled = true;
          fs.writeFileSync(autoreactPath, JSON.stringify(isEnabled, null, 2)); 
          return api.sendMessage("Auto react is now turned on", event.threadID, event.messageID);
      }
  } catch (error) {
      console.error(error);
  }
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
      if (!isEnabled) return;
      const response = await axios.get(`https://eurix-api.replit.app/react?q=${encodeURIComponent(event.body)}`);
      const reaction = response.data.react;
      api.setMessageReaction(reaction, event.messageID, (err) => {}, true);
  } catch (error) {
      console.error(error);
  }
};