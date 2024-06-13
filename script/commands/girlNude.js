const axios = require("axios");
const path = require("path");
const fs = require("fs-extra");

module.exports.config = {
  name: "girlnude",
  version: "1.0.0",
  description: "Generate a nude image",
  hasPermssion: 0,
  credits: "Hulaan mo",
  usages: "girlnude",
  commandCategory: "bawal sa bata",
  cooldowns: 12,
};

module.exports.run = async function ({ api, event }) {
  try {
    const response = await axios.get(`https://eurix-api.replit.app/nude?uid=${encodeURIComponent(event.senderID)}`);

    if (response.data.error) {
      api.sendMessage(response.data.error, event.threadID);
      return;
    }

    const image = response.data.url;
    const imagePath = path.join(__dirname, "cache", "girlNude.png");

    const imageResponse = await axios.get(image, { responseType: "arraybuffer" });

    await fs.writeFile(imagePath, Buffer.from(imageResponse.data, "binary"));

    api.sendMessage({ body: `🥵 Ugh\n\nTitle: ${response.data.type}`, attachment: fs.createReadStream(imagePath) }, event.threadID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage(`Error: ${error.message}`, event.threadID);
  }
};