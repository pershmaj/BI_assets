require('dotenv').config()
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const middleware = require('./middleware');
const routes = require('./routes');
const logger = require('./winston');

const app = express();


//enable cors
app.use(cors());
app.options('*', cors());
//parse body
app.use(express.json())
// log requests
app.use(morgan("combined", { stream: logger.stream }));

app.use('/api', routes);
//handle 404 requests
app.all('*', function (req, res, next) {
    const error = new Error(
        `${req.ip} tried to access ${req.originalUrl} ${new Date()}`,
    );
    console.error(error);
    next(error);
});
// error handling middleware
app.use(middleware.routerErrorHandler);

const port = process.env.PORT;

app.listen(port, () => logger.info(`Listening on port ${port}`));