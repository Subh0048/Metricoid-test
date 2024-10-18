const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js');
const postRoutes = require('./routes/posts');
const http = require("http");
const app = express();

const server = http.createServer(app);


dotenv.config();


const PORT = process.env.PORT ;

// Middleware
app.use(cors(
    {
        origin:"*"
    }
));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.get("/", (req, res) => {
    res.send("Hello");
  });



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));



// Start the server


server.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  );
