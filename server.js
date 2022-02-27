const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const path = require('path');

const userRouter = require('./routes/userRouter');

const app = express();

const PORT = process.env.PORT || 3001;

//app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/api/user', userRouter);

app.get('/api', async (req, res) => {
  res.json({message: 'Server is working.'});
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
