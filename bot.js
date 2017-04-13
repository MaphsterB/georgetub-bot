#!node

var SlackClient = require("@slack/client");
var RtmClient = SlackClient.RtmClient;
var WebClient = SlackClient.WebClient;
var RTM_EVENTS = SlackClient.RTM_EVENTS;
var CLIENT_EVENTS = SlackClient.CLIENT_EVENTS;


var token = process.env.SLACK_BOT_TOKEN || "";
var rtm = new RtmClient(token, { logLevel: "info"});


rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
    console.log(`Logged on as ${rtmStartData.self.name} on team ${rtmStartData.team.name}.`);
});


rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
    console.log("Connection fully opened! Ready to send messages.");
});


rtm.on(RTM_EVENTS.MESSAGE, function(message) {
    console.log("Message Received: ", message);
    rtm.sendMessage("Still testing. GTFO.", message.channel);
});


rtm.on(RTM_EVENTS.REACTION_ADDED, function(reaction) {
    console.log("Reaction Added: ", reaction);
    rtm.sendMessage("WTF are you doing. Get that shit off my message RIGHT NOW.", reaction.item.channel);
});


rtm.on(RTM_EVENTS.REACTION_REMOVED, function(reaction) {
    console.log("Reaction Removed: ", reaction);
    rtm.sendMessage("Damn skippy. Now leave it that way.", reaction.item.channel);
});


rtm.start();
