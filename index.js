const express = require('express');
const app = express();

require('./db/mongoose');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter)


const port = process.env.PORT ;


app.listen(port, () => {
    console.log(`Server  is running on port ${port}`);
});