const express = require('express');
const cors = require('cors');
const Routes = require('./routes');
const connect = require('./database');
const app = express();


app.use(cors());
app.use(express.json());


// Connect to MongoDB atlas
connect();


// without Auth Routes
app.use('/api/', Routes);

// Auth Routes with group middleware
// app.use('/api/auth', AuthMiddleware, AuthRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
