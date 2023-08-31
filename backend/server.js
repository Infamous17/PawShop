const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const listingRoute = require('./routes/listingRoute');
const chatRoute = require('./routes/chatRoutes');
const messageRoute = require('./routes/messageRoutes');
const path = require('path');

const app = express();
dotenv.config();
connectDb();

app.use(express.json());
app.use("/", userRoutes);   //to accept JSON data
app.use("/", listingRoute);
app.use("/", chatRoute);
app.use("/", messageRoute);

// -------DEPLOYMENT---------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running successfully");
    });
}

// -------DEPLOYMENT---------

const server = app.listen(5000, console.log("Server started at port 5000"));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData.data._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if (!chat.users) return console.log("chat.users not define");

        chat.users.forEach(user => {
            if (user._id === newMessageReceived._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData.data._id);
    });
});