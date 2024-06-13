const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "poli",
  version: "9.0.6",
  hasPermmsion: 0,
  credits: "Eugene Aguilar",
  description: "Make images from yours prompts.",
  commandCategory: "generate",
  usages: "poli [prompt]",
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  try {
    let query = args.join(" ");
    if (!query) return api.sendMessage("Please enter prompts", threadID, messageID);
    let path = __dirname + `/cache/poli.png`;
    const poli = (await axios.get(`https://image.pollinations.ai/prompt/${query}`, {
      responseType: "arraybuffer",
    })).data;
    fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
    api.sendMessage({
      body: "Image will be deleted after 1 hour!",
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path));
  } catch (error) {
    api.sendMessage(`Error occurred, please try again later.`, threadID, messageID);
    console.log(error);
  }
};