const axios = require("axios");

module.exports.config = {
    name: "paste",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Eugene Aguilar",
    description: "Paste code to a server",
    commandCategory: "general",
    usages: "/paste <code> /paste <id>",
    cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const code = args.join(" ");
        if (!code) {
            api.sendMessage(`/paste <code> /paste <id>`, event.threadID, event.messageID);
            return;
        }

        if (args[0] === "raw") {
            const pasteId = args[1];
            if (!pasteId) {
                api.sendMessage(`Missing ID`, event.threadID, event.messageID);
                return;
            }

            try {
                const response = await axios.get(`https://eurix-api.replit.app/paste/raw?id=${encodeURIComponent(pasteId)}`);
                api.sendMessage(`${response.data}`, event.threadID, event.messageID);
            } catch (error) {
                api.sendMessage(`Error: ${error}`, event.threadID, event.messageID);
                console.log(error);
            }
        } else {
            const response = await axios.get(`https://eurix-api.replit.app/paste/create?code=${encodeURIComponent(code)}`);
            const pasteId = response.data.id;
            api.sendMessage(`Paste ID: ${pasteId}`, event.threadID, event.messageID);
        }
    } catch (error) {
        api.sendMessage(`Error: ${error}`, event.threadID, event.messageID);
        console.log(error);
    }
};