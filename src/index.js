import Tester from "./test/tester";
/**
 * Created by vadimsky on 01/07/16.
 */

let tester = new Tester("Vasya");
console.log(tester.name);
console.log("--");
tester.name = "Stepan";
console.log(tester.name);