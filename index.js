// require('dotenv').config();
// const auth = require('./auth');
const express = require('express');
const cors = require('cors');
const userRouter = require('./users/user.router');
const taskRouter = require('./tasks/task.router');

const app = express();
const db = require('./db');
db.connect();

app.use(express.json());
app.use(cors());

// app.use(auth.checkToken);

app.use('/user', userRouter);
app.use('/task', taskRouter);

// app.get('/',auth.checkToken, (req, res) => {
//     res.send('Welcome to the API');
// });

// app.post('/login', (req, res) => {
//     const token = auth.login(req.body);
//     res.send(token);
// });

// app.post('/login', auth.login);


const PORT = 2700; // Use port from environment variable or default to 2600
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
