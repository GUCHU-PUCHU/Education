const axios = require("axios");

module.exports.config = {
  name: "imgur", 
  version: "9",
  credits: "Eugene Aguilar",
  description: "Upload to imgur",
  usages: "imgur [ reply a photo ]",
  commandCategory: "media",
  cooldowns: 0, 
  hasPermssion: 0,
};

module.exports.run = async function ({ api, event }) {
  const attachments = event.messageReply.attachments;

  if (!attachments || !attachments.length) {
    api.sendMessage(`Missing image`, event.threadID, event.messageID);
    return;
  }

  const imageLinks = attachments.map(attachment => attachment.url);
  const imgurLinks = [];

  try {
    for (const image of imageLinks) {
      const response = await axios.get(`https://eurix-api.replit.app/imgur?link=${encodeURIComponent(image)}`);
      const uploadedImages = response.data.uploaded.image;
 
      imgurLinks.push(uploadedImages);
    }
    api.sendMessage(`Uploaded images\nLink:\n${imgurLinks.join("\n")}`, event.threadID, event.messageID);
  } catch(error) {
    console.log(error);
    api.sendMessage(`${error}`, event.threadID, event.messageID);
  }
};