import Tester from "./test/tester";

/**
 * Created by vadimsky on 01/07/16.
 */
import logger from './logger/logger.service';
logger.log('info', 'Tester module running...');
let tester = new Tester("Vasya");
//logger.log('info', 'Tester module running...');

// const log = Logger.GetLogger("main");
// log.info("Info: Hello Log!!! ");
// log.error("Hello Error!!! ");
// log.debug("Lets debug it!!! ");
// log.trace("Trace the module");

console.log(tester.name);
console.log("--");
tester.name = "Stepan";
console.log(tester.name);