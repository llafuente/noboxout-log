function __callee() {
    var orig = Error.prepareStackTrace,
        err,
        stack;

    Error.prepareStackTrace = function () {
        return arguments[1];
    };

    err = new Error();
    Error.captureStackTrace(err, arguments.callee);

    stack = err.stack;

    Error.prepareStackTrace = orig;

    return stack[1].getFileName().split("/").slice(-1)[0] + ":" + stack[1].getLineNumber();
}

// for more debug control
var old_log = console.log;
console.log = function() {
    var ar = Array.prototype.slice.call(arguments);
    ar.unshift(__callee());
    old_log.apply(console, ar);
};
var old_info = console.info;
console.info = function() {
    var ar = Array.prototype.slice.call(arguments);
    ar.unshift(__callee());
    old_info.apply(console, ar);
};


(function () {
    "use strict";

    require("colors");

    var util = require("util"),
        inspect = util.inspect,
        ArrayMap = Array.prototype.map;

    module.exports = {
        logLiteral: "",
        logLevel: 7,
        logMute: false,

        addLogLiteral: function (literal) {
            this.logLiteral = literal;
        },
        verbose: function () {
            if (this.logMute || this.logLevel < 6) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.print([new Date().toISOString().slice(0, 19).replace("T", " "), "[vrb]", __callee(), " ", this.logLiteral, log].join("").cyan, "\n");
        },
        debug: function () {
            if (this.logMute || this.logLevel < 5) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.print([new Date().toISOString().slice(0, 19).replace("T", " "), "[dbg]", __callee(), " ", this.logLiteral, log].join("").blue, "\n");
        },
        log: function () {
            if (this.logMute || this.logLevel < 4) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.print([new Date().toISOString().slice(0, 19).replace("T", " "), "[log]", __callee(), " ", this.logLiteral, log].join("").white, "\n");
        },
        info: function () {
            if (this.logMute || this.logLevel < 3) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.print([new Date().toISOString().slice(0, 19).replace("T", " "), "[inf]", __callee(), " ", this.logLiteral, log].join("").green, "\n");
        },
        warn: function () {
            if (this.logMute || this.logLevel < 2) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.error([new Date().toISOString().slice(0, 19).replace("T", " "), "[wrn]", __callee(), " ", this.logLiteral, log].join("").yellow);
        },
        err: function () {
            if (this.logMute || this.logLevel < 1) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.error([new Date().toISOString().slice(0, 19).replace("T", " "), "[err]", __callee(), " ", this.logLiteral, log].join("").red);
        }
    };

}());