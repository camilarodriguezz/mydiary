const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./models/model');
require('./config/mongoose.config');
require('./routes/routes')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
});
