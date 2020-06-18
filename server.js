const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// configure body parser for AXIOS requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./models/model');
require('./config/mongoose.config');
require('./routes/routes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`)
});
