const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { connectToDb } = require('./connectDB/connect'); // Updated import path
const routes = require('./routes/routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToDb();

// Session middleware
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://Contributors:kj0zL1RFxCurMsm0@cluster0.mzvwlgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster03',
    collectionName: 'sessions' 
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Middleware
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


// const allowedOrigins = [                  
//   'http://localhost:5173',
//   'http://backend-app:3000',
//   'http://backend-app:5173'
// ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman) or check against allowed origins
    callback(null, true);
  },
  credentials: true, // if true Enable credentials (cookies, authorization headers)
}));

// Handle preflight requests
app.options('*', cors());

app.use('/', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});