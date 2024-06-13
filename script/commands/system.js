const os = require("os");
const moment = require("moment");


module.exports.config = {
  name: "system",
  version: "9.0.2",
  credits: "Eugene Aguilar",
  hasPermssion: 2,
  description: "Displays system information",
  usages: "/system",
  cooldowns: 0,
  commandCategory: "system",
};

module.exports.run = async function ({ api, event }) {
  try {

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);


    await api.sendMessage( `» Bot Information\n» System: ${os.type()}\n» Commands: ${global.client.commands.size}\n» Events: ${global.client.events.size}\n» Users: ${global.data.allUserID.length}\n» Threads: ${global.data.allThreadID.length}\n» OS: ${os.platform()}\n» Host: ${os.hostname()}\n» Kernel: ${os.release()}\n» Platform: ${os.arch()}\n» NodeJS Memory: ${process.memoryUsage().heapUsed / 1024 / 1024}\n» Date: ${moment.tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss")}\n» Database Storage: ${process.memoryUsage().rss / 1024 / 1024} MB\n» Runtime: ${hours} Hours ${minutes} Minutes ${seconds} Seconds\n» Ping: ${Date.now() - event.timestamp}`, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    await api.sendMessage(
      "An error occurred while fetching system information.",
      event.threadID,
      event.messageID,
    );
  }
};