/**
 * Created by vadimsky on 10/06/16.
 */
import winston from 'winston';
const ENV = process.env.NODE_ENV;

export default function GetLogger() {
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: ENV == 'development' ? 'debug': 'error',
                label: "ingo"
            })
        ]
    });
}
