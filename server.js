require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;
const verifyAdmin = require('./middleware/verifyAdmin');

const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const notificationRoute = require("./routes/notifications");


// Connect to MongoDB
connectDB();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://comsats-devops.vercel.app"],
}));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));

app.use('/auth', require('./routes/auth'));

app.use('/refresh', require('./routes/refresh'));


//chat
app.use("/chat/conversations", conversationRoute);
app.use("/chat/messages", messageRoute);

//Notification
app.use("/notification", notificationRoute);


//logout
app.use('/logout', require('./routes/logout'));




app.use('/admin',
    verifyAdmin,
    require('./routes/adminRoutes'));
//{"Email": "dan@dan.com" , "Password": "12345"}

app.use(verifyJWT);

app.use('/student', require('./routes/api/student'));
app.use('/teacher', require('./routes/api/teacher'))


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

//=========================================

//Socket Io Chat

const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {



    if(userId != null && socketId != null){

        !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    }


    };
      
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {

    
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
       

      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId._id);
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    socket.on("sendNotification", ({ senderId, receiverId, content, title }) => {
      const user = getUser(receiverId._id);
      io.to(user?.socketId).emit("getNotification", {
        senderId,
        title,
        content,
      });
    });
  
    //when disconnected
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  


//=========================================





app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});