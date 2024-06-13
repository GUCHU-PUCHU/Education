  module.exports.config = {
      name: "stalk",
      version: "1.0.0",
      hasPermission: 0,
      credits: "Eugene Aguilar",
      description: "Get info using UID/mention/reply to a message.",
      usages: "[reply/UID/@mention]",
      commandCategory: "info",
      cooldowns: 0,
  };

  module.exports.run = async function({ api, event, args, utils, Users, Threads }) {
      try {
          const axios = require('axios');
          const fs = require("fs-extra");
          const request = require("request");
          const { threadID, senderID, messageID } = event;

          let id;
          if (args.join().indexOf('@') !== -1) {
              id = Object.keys(event.mentions)[0];
          } else {
              id = args[0] || event.senderID;
          }

          if (event.type === "message_reply") {
              id = event.messageReply.senderID;
          }

          const res = await axios.post(`https://eurix-api.replit.app/stalk`, { uid: id });

          const { name, gender, relationship, love, link, followers, birthday, hometown, location, avatar } = res.data;

          const ok = `❯ Name: ${name}\n❯ ID: ${id}\n❯ Birthday: ${birthday}\n❯ Gender: ${gender}\n❯ Hometown: ${hometown}\n❯ Location: ${location}\n❯ Relationship: ${relationship} with ${love}\n❯ Followers: ${followers}\n❯ Link: ${link}`;


          const imageStream = fs.createWriteStream(__dirname + `/cache/image.png`);
          request(encodeURI(avatar)).pipe(imageStream);
          imageStream.on("close", () => {
              api.sendMessage({
                  body: `${ok}`,
                  attachment: fs.createReadStream(__dirname + `/cache/image.png`)
              }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
          });
      } catch (error) {
          console.error(error);
          api.sendMessage(`An error occurred while processing your request.`, event.threadID, event.messageID);
      }
  };