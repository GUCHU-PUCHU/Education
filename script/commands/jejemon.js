const axios = require('axios');

module.exports.config = {
 name: "jejemon",
 version: "9",
 credits: "holy Eugene",
 hasPermssion: 0,
 description: "convert into jj typings",
 commandCategory: "fun",
 usages: "jejemon [text]",
 cooldowns: 10,
};
module.exports.run = async function ({api, event, args }) {
try {
const text = args.join(" ");
if(!text) {
api.sendMessage(`/jejemon <text>`, event.threadID);
return;
}

const response = await axios.get(`https://eurix-api.replit.app/jeje?text=${encodeURIComponent(text)}`);
const message = response.data.jejemon;
api.sendMessage(message, event.threadID);
} catch (error) {
api.sendMessage(`error napo maya nalang hehe`, event.threadID);
console.log(error);
}
};