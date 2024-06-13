const cron = require('node-cron');
const axios = require("axios");
const request = require('request');
const fs = require("fs");

const activeThreads = {};

module.exports.config = {
  name: "shoticron",
  version: "1.0.0",
  credits: "Eugene Aguilar",
  description: "Auto send every 1 minute",
  hasPermission: 0,
  commandCategory: "node-cron",
  usages: "on/off",
  cooldowns: 5,
  dependencies: [],
  usePrefix: true,
};

module.exports.run = async function({ api, event, args }) {
  const threadID = event.threadID;

  if (args[0] === "on") {
    if (!activeThreads[threadID]) {
      activeThreads[threadID] = true;
      api.sendMessage(`Automatic sending of videos is now enabled.`, threadID);

      cron.schedule('*/1 * * * *', async () => {
        try {
          if (activeThreads[threadID]) {


            const response = await axios.post(`https://shoti-api.replit.app/api/request/f`);

            const username = response.data.data.username;
            const nickname = response.data.data.nickname;

            const file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
            const rqs = request(encodeURI(response.data.data.eurixmp4));
            rqs.pipe(file);
            file.on('finish', () => {
              api.sendMessage({
                body: `Username: @${username}\nNickname: ${nickname}`,
                attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
              }, threadID, (error, info) => {
                if (!error) {
                  fs.unlinkSync(__dirname + '/cache/shoti.mp4');
                }
              });
            });
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    } else {
      api.sendMessage("Automatic sending of videos is already ON in this thread.", threadID);
    }
  } else if (args[0] === "off") {
    if (activeThreads[threadID]) {
      activeThreads[threadID] = false;
      api.sendMessage(`Automatic sending of videos is now disabled.`, threadID);
    } else {
      api.sendMessage("Automatic sending of videos is already OFF in this thread.", threadID);
    }
  } else {
    api.sendMessage("Invalid command. Please use 'on' or 'off'.", threadID);
  }
};