/**
 * Created by vadimsky on 01/07/16.
 */


import logger from '../logger/logger.service';

logger.log('info', 'Tester module running...');
export default class Tester {
    constructor (name) {
        console.log("Tester created, with name: ", name);
        logger.log('info', 'Tester created, with name:' + name);
        this._name = name;
    }

    get name() {
        return this._name;
    }
    set name(newName) {
        if (!newName) return;
        this._name = newName;
    }
}
