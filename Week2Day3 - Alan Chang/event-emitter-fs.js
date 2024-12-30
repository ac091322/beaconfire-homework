const EventEmitter = require("events");
const fs = require("fs");


class Chatroom extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.users = [];
    }

    join(username) {
        try {
            if (this.users.includes(username)) throw new Error(`The user ${username} is already in the chatroom.`);
            this.users.push(username);
            this.emit("userJoined", username);
        } catch (error) {
            console.error("Error joining chatroom:", error);
        }
    }

    sendMessage(username, message) {
        this.emit("messageSent", username, message);
    }

    broadcastMessage(username, message) {
        this.users.forEach(user => {
            if (user !== username) {
                const broadcastMessage = `Sending message to ${user} | ${username} says: ${message}\n`;

                // append the broadcast message to the file
                fs.appendFile("chatroom_log.txt", broadcastMessage, (error) => {
                    if (error) {
                        console.error("Error writing to chatroom_log.txt:", error);
                    }
                });
            }
        });
    }
}

const chatroom = new Chatroom("Chatting in Node.js");

// create the chatroom_log.txt file if it doesn't exist and add initial content
fs.writeFile("chatroom_log.txt", "Chatroom log started\n", (error) => {
    if (error) {
        console.error("Error creating the chatroom_log.txt file:", error);
    } else {
        console.log("chatroom_log.txt file successfully created");

        const chatroom = new Chatroom("Chatting in Node.js");

        // handle the "userJoined" event and log to the file
        chatroom.on("userJoined", (username) => {
            const message = `Broadcast: the user ${username} has joined the chat.\n`;

            // append the user join message to the file
            fs.appendFile("chatroom_log.txt", message, (error) => {
                if (error) {
                    console.error("Error writing to chatroom_log.txt:", error);
                }
            });
        });

        // handle the "messageSent" event and log the message to the file
        chatroom.on("messageSent", (username, message) => {
            chatroom.broadcastMessage(username, message);
            const logMessage = `${username}: ${message}\n`;

            // append the message to the file
            fs.appendFile("chatroom_log.txt", logMessage, (error) => {
                if (error) {
                    console.error("Error writing to chatroom_log.txt:", error);
                }
            });
        });

        chatroom.join("Alan");
        chatroom.join("John");
        chatroom.join("Jane");

        chatroom.sendMessage("Alan", "Hello there!");
        chatroom.sendMessage("John", "Howdy!");
        chatroom.sendMessage("Jane", "What's up?");
    }
});
