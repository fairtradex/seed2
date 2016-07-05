const winston  = require('winston');
const fs = require('fs');

// TODO: Read from configuration following parameters: env, log level, etc..
// TODO: API:  info, error, debug, trace,
const logDir = 'log'; // Or read from a configuration
// const env = (process.env.NODE_ENV || 'development');
const env = 'development';



if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logDir );
}

winston.setLevels( winston.config.npm.levels );
winston.addColors( winston.config.npm.colors );

const logger = new winston.Logger  ({
        transports: [
            new winston.transports.Console( {
                level: 'warn', // Only write logs of warn level or higher
                colorize: true
            } ),
            new winston.transports.File( {
                level: env === 'development' ? 'debug' : 'info',
                filename: logDir + '/logs.log',
                maxsize: 1024 * 1024 * 10 // 10MB
            } )
        ],
        exceptionHandlers: [
            new winston.transports.File({
                filename: 'log/exceptions.log'
            })
        ]
    }
);
module.exports = logger;
