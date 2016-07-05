/**
 * Created by vadimsky on 01/07/16.
 */
/*
import express from 'express';
import path    from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
*/


const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8000;
/**
 * Middleware
 */
//app.use(favicon( path.join(__dirname, config.get('favicon'))));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// We are going to protect /api routes with JWT
//app.use(expressJwt({secret: config.get('secret')}).unless({path: ['/auth']}));



app.get('/', (req, res) => {
    res.status(200).json({ message: 'Micro Service API' });
});



app.listen(port, () => {
    console.log('Express server listening on port:', port);
});

