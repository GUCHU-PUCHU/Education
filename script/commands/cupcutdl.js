const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "cupcutdl",
  version: "9.0.5",
  hasPermssion: 0,
  credits: "Eugene Aguilar",
  description: "Download video from cupcut",
  commandCategory: "media",
  usages: "[link]",
  cooldowns: 6,
};

module.exports.run = async function ({ api, event, args }) {
  try {


      const link = args.join(" ");
      if (!link) {
        return api.sendMessage(
          `Please enter a valid link from cupcut.com`,
          event.threadID,
          event.messageID
        );
      }

      api.sendMessage(`Downloading video, please wait...`, event.threadID, event.messageID);

      const response = await axios.get(
        `https://eurix-api.replit.app/cupcutdl?link=${encodeURIComponent(link)}`
      );
      const video = response.data.eurixmp4;
      const title = response.data.title;
      const description = response.data.description;
      const like = response.data.like;

      const videoPath = path.join(__dirname, "cache", "cupcut.mp4");

      const writer = fs.createWriteStream(videoPath);

      const videoResponse = await axios.get(video, { responseType: "stream" });

      videoResponse.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage(
          {
            body: `Title: ${title}\nDescription: ${description}\nLikes: ${like}`,
            attachment: fs.createReadStream(videoPath),
          },
          event.threadID, event.messageID
        );
      });
    }
  } catch (error) {
    api.sendMessage(`Error: ${error}`, event.threadID, event.messageID);
    console.error(error);
  }
};