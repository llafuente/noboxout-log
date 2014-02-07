var log = require("./index.js");


function rainbow() {
    log.verbose("verbose");
    log.debug("debug");
    log.log("log");
    log.info("info");
    log.warn("warning");
    log.err("error");
}



console.log("all");
rainbow();

console.log("muted");
log.logMute = true;
rainbow();
log.logMute = false;

for (i = 7; i > -1; --i) {

    console.log("level " + i);
    log.logLevel = i;
    rainbow();
}

log.addLogLiteral(" -- ");

for (i = 7; i > -1; --i) {

    console.log("level " + i);
    log.logLevel = i;
    rainbow();
}