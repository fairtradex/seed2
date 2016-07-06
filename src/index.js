/**
 * Created by vadimsky on 01/07/16.
 */
import express from 'express';
import path    from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import logger from './logger/logger.service';
const config = require('../config');

logger.log('info', 'Tester module running...');

const app = express();
const port = config.get("port");
/**
 * Middleware
 */
//app.use(favicon( path.join(__dirname, config.get('favicon'))));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Micro Service API' });
});


app.listen(port, () => {
    console.log('Express server listening on port:', port);
    logger.log('info', 'Tester module running...', port);
});

