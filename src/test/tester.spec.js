/**
 * Created by vadimsky on 02/07/16.
 */
import 'babel-polyfill'
import Tester from "./tester";
let assert = require('chai').assert;


describe("The tester test :-)", function () {
    let tester;
    before(function () {
        tester = new Tester("Vasya");
    });
    it('Create tester Vasya',  () => {
        assert.equal("Vasya", tester.name);
    });
    it('Rename tester Vasya to Haim',  () => {
        tester.name = "Haim";
        assert.equal("Haim", tester.name);
    });

    
});


