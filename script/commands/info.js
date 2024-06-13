const moment = require("moment");
const axios = require("axios");
const path = require("path");
const fs = require("fs-extra");

module.exports.config = {
  name: "info",
  credits: "Eugene Aguilar",
  version: "9.0.2",
  hasPermission: 0,
  description: "Displays information about the bot and owner",
  commandCategory: "system",
  cooldowns: 10,
  usage: "[owner]",
};

module.exports.run = async function ({ api, event }) {
  try {
    var avatar = await axios.get(`https://graph.facebook.com/${global.config.id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" });
    const avt = avatar.data;

    const imgPath = path.join(__dirname, "cache", "info.png");

    fs.writeFileSync(imgPath, Buffer.from(avt, "binary"));

    await api.sendMessage({ 
      body: `———» ADMIN BOT «——— 
❯ Bot Name: ${global.config.BOTNAME}
❯ Bot Owner: ${global.config.OWNER}
❯ Age: ${global.config.AGE} 
❯ Gender: ${global.config.GENDER}
❯ Facebook: ${global.config.FACEBOOK}
❯ Total Group: ${global.data.allThreadID.length}
❯ Total Users: ${global.data.allUserID.length}
❯ Bot Prefix: ${global.config.PREFIX}
❯ Today is: ${moment.tz("Asia/Manila").format(`dddd, LL h:mm A`)}
❯ Thanks for using ${global.config.BOTNAME} BOT`,  
      attachment: fs.createReadStream(imgPath)
    }, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage(`${error.message}`, event.threadID, event.messageID);
  }
};