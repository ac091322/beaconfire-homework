/*
1. Create a ChatRoom class that will use EventEmitter to handle events.
2. Emit events for when a user joins and sends a message.
3. Handle these events using listeners that broadcast the message and log user activity.
*/

const EventEmitter = require("events");

// ChatRoom class that extends EventEmitter
class ChatRoom extends EventEmitter {
    constructor(name) {
        super();  // must call super() otherwise error
        this.name = name;  // store the name of the chatroom
        this.users = [];  // store users who have joined the chatroom
    }

    // instance method jon() --> add a user to the chatroom
    join(username) {
        try {
            if (this.users.includes(username)) throw new Error(`The user ${username} is already in the chatroom.`);
            this.users.push(username);
            // emit(event, arg1, arg2, arg3)
            this.emit("userJoined", username);  // emit the "userJoined" event
        } catch (error) {
            console.error("Error joining chatroom:", error);
        }

    }

    // instance method sendMessage() --> sends a message from a user
    sendMessage(username, message) {
        // emit(event, arg1, arg2, arg3)
        this.emit("messageSent", username, message);  // emit the "messageSent" event
    }

    // instance method broadCastMessage() --> broadcast the message to all users except self
    braodcastMessage(username, message) {
        this.users.forEach(user => {
            if (user !== username) console.log(`Sending message to ${user} | ${username} says: ${message}`);
        });
    }
}

// create a new chatroom
const chatroom = new ChatRoom("Chatting in Node.js");

// listens for the event "userJoined"
// .on(event, listener)
chatroom.on("userJoined", (username) => {  // register a listener for the "userJoined" event
    console.log(`Broadcast: the user ${username} has joined the chat.`);  // log broadcast message when a user joins
});

// listen for the event "messageSent"
// .on(event, listener)
chatroom.on("messageSent", (username, message) => {  // register a listener for the "messageSent" event
    chatroom.braodcastMessage(username, message);  // call braodcastMessage to send the messsage to all other users
});

// simulate users joining the chatroom --> triggers the event "userJoined"
chatroom.join("Alan");
chatroom.join("Alan");  // will throw error
chatroom.join("John");
chatroom.join("Jane");

// simulate users sending messages-- > triggers the event "messageSent"
chatroom.sendMessage("Alan", "Hello there!");
chatroom.sendMessage("John", "Howdy!");
chatroom.sendMessage("Jane", "What's up?");
