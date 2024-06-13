const path = require('path');
const fs = require('fs');
const axios = require('axios');

module.exports.config = {
  name: "tikinfo",
  version: "9.0.7",
  hasPermssion: 0,
  credits: "Eugene Aguilar",
  description: "Get information about a Tiktok user",
  commandCategory: "information",
  usages: "[username]",
  cooldowns: 5,
};
module.exports.run = async function ({api, event, args}) {
  try {
    const username = args.join(" ");
    if (!username) {
      return api.sendMessage("Please enter a Tiktok username.", event.threadID, event.messageID);
    }

    const response = await axios.get(`https://eurix-api.replit.app/tikstalk?username=${username}`);
    const id = response.data.id;
    const nickname = response.data.nickname;
    const user = response.data.username;
    const avatar = response.data.avatarLarger;
    const follower = response.data.followerCount;
    const following = response.data.followingCount;
    const heart = response.data.heartCount;

    const tite = path.join(__dirname, `/cache/${id}.png`);

    const getAvatar = await axios.get(avatar, { responseType: 'arraybuffer' });

    fs.writeFileSync(tite, Buffer.from(getAvatar.data, 'utf-8'));

    api.sendMessage({
      body: `Tiktok Information\n\nUsername: ${user}\nNickname: ${nickname}\nFollowers: ${follower}\nFollowing: ${following}\nHearts: ${heart}\nID: ${id}`,
      attachment: fs.createReadStream(tite)
    }, event.threadID, () => fs.unlinkSync(tite), event.messageID);
  } catch (error) {
    api.sendMessage(`An error occurred while fetching the Tiktok information.\n${error}`, event.threadID, event.messageID);
    console.log(error);
  }
};