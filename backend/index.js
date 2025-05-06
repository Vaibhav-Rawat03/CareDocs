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


const allowedOrigins = [
  'http://care-docs-lb-1246403747.ap-south-1.elb.amazonaws.com:5173',
  'http://care-docs-lb-1246403747.ap-south-1.elb.amazonaws.com',
  'http://care-docs-lb-1246403747.ap-south-1.elb.amazonaws.com:3000',
  'http://care-docs-lb-1246403747.ap-south-1.elb.amazonaws.com:80',
  'http://localhost:5173',
  'http://13.235.245.211:5173',
  'http://13.235.245.211:3000'
];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (e.g., Postman) or check against allowed origins
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Enable credentials (cookies, authorization headers)
// }));

// // Handle preflight requests
// app.options('*', cors());

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin.toLowerCase())) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };

const corsOptions = {
  origin: '*', // This allows all origins
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // <-- Use the SAME config

app.use('/', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});