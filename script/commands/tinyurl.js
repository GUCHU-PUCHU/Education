const tinyurl = require('tinyurl');

module.exports.config = {
    name: "tinyurl",
    version: "1.0",
    credits: "Eugene Aguilar",
    description: "Shorten URLs using TinyURL",
    usages: "tinyurl <link>",
    commandCategory: "utility",
    hasPermmsion: 0,
    cooldowns: 3,
};

module.exports.run = async function ({ event, api }) {
    const { sendMessage: messageReply } = api; 
    if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
        return messageReply({ body: "❌ | Please reply to an attachment." }, event.threadID, event.messageID); 
    }

    const attachment = event.messageReply.attachments[0];

    try {
        const shortUrl = await tinyurl.shorten(attachment.url);
        messageReply({ body: `"${shortUrl}"` }, event.threadID, event.messageID); 
    } catch (error) {
        messageReply({ body: "❌ | Error occurred while shortening URL." }, event.threadID, event.messageID);
        console.error(error);
    }
};