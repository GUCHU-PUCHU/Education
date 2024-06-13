const axios = require("axios");
const cron = require("node-cron");

module.exports.config = {
    name: "bible",
    version: "9.0.8",
    hasPermssion: 0,
    credits: "Eugene Aguilar",
    description: "Retrieve a random Bible verse.",
    commandCategory: "bible study",
    usages: "",
    cooldowns: 0,
};

module.exports.run = async function ({ api, event }) {
    try {
        const response = await axios.get(`https://eurix-api.replit.app/bible`);
        const result = response.data.eugene;
        api.sendMessage(`Random bible verse\n\n${result}`, event.threadID, event.messageID);
    } catch (error) {
        api.sendMessage(`An error occurred while fetching the bible verse.\n${error}`, event.threadID, event.messageID);
        console.error("Error retrieving Bible verse:", error);
    }
};
