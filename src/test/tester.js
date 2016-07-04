/**
 * Created by vadimsky on 01/07/16.
 */

import GetLogger from "../lib/logger";
//
 const log = GetLogger(module);
export default class Tester {
    constructor (name) {
        console.log("Tester created, with name: ", name);
        log.info("Zhopa");
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
