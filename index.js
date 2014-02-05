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

    return stack[2].getFileName().split("/").slice(-1)[0] + ":" + stack[2].getLineNumber();
}

(function () {
    "use strict";

    require("colors");

    var util = require("util"),
        inspect = util.inspect;

    module.exports = {
        verbose: function () {
            if (this.logMute || this.logLevel < 4) {
                return;
            }

            var log = Array.prototype.map.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.print(new Date().toISOString().slice(0, 19).replace("T", " "), "[vrb]", __callee(), " ", log.cyan, "\n");
        },
        debug: function () {
            if (this.logMute || this.logLevel < 3) {
                return;
            }

            var log = Array.prototype.map.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.print(new Date().toISOString().slice(0, 19).replace("T", " "), "[dbg]", __callee(), " ", log.green, "\n");
        },
        warn: function () {
            if (this.logMute || this.logLevel < 2) {
                return;
            }

            var log = Array.prototype.map.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.error([new Date().toISOString().slice(0, 19).replace("T", " "), "[wrn]", __callee(), " ", log.yellow].join(""));
        },
        err: function () {
            if (this.logMute || this.logLevel < 1) {
                return;
            }

            var log = Array.prototype.map.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.error([new Date().toISOString().slice(0, 19).replace("T", " "), "[err]", __callee(), " ", log.red].join(""));
        },
        logLevel: 5,
        logMute: false
    };

}());