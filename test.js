var log = require("./index.js");


function rainbow() {
    log.verbose("verbose");
    log.debug("debug");
    log.err("error");
    log.warn("warning");
}



console.log("all");
rainbow();

console.log("muted");
log.logMute = true;
rainbow();
log.logMute = false;

console.log("level 4");
log.logLevel = 4;
rainbow();

console.log("level 3");
log.logLevel = 3;
rainbow();

console.log("level 2");
log.logLevel = 2;
rainbow();

console.log("level 1");
log.logLevel = 1;
rainbow();


console.log("level 0");
log.logLevel = 0;
rainbow();