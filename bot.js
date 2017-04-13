#!node

var SlackClient = require("@slack/client");
var RtmClient = SlackClient.RtmClient;
var RTM_EVENTS = SlackClient.RTM_EVENTS;

var token = process.env.SLACK_API_TOKEN || "";


var rtm = new RtmClient(token, { logLevel: "info"});
rtm.start();


rtm.on(RTM_EVENTS.MESSAGE, function(message) {
    console.log("Message Received: ", message);
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function(reaction) {
    console.log("Reaction Added: ", reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function(reaction) {
    console.log("Reaction Removed: ", reaction);
});
