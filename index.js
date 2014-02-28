var sep = require("path").sep;
function __callee(num_traces) {
    var orig = Error.prepareStackTrace,
        err,
        stack,
        i,
        traces_list = [];

    Error.prepareStackTrace = function () {
        return arguments[1];
    };

    err = new Error();
    Error.captureStackTrace(err, arguments.callee);

    stack = err.stack;

    Error.prepareStackTrace = orig;

    for (i = Math.min(stack.length - 1, num_traces); i >= 1; --i) {
        traces_list.push(stack[i].getFileName().split(sep).slice(-1)[0] + ":" + stack[i].getLineNumber());
    }    

    return traces_list.join(",");
}

["log", "info", "warn", "error"].forEach(function (k) {
    // for more debug control
    var old = global.console[k];
    global.console[k] = function () {
        var ar = Array.prototype.slice.call(arguments);
        ar.unshift(__callee(1));
        old.apply(global.console, ar);
    };
});


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
        logTraces: 2,

        verbose: function () {
            if (this.logMute || this.logLevel < 6) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v, {depth: 5});
            }).join(" ");

            util.print([new Date().toISOString().slice(0, 19).replace("T", " "), "[vrb]", __callee(this.logTraces), " ", this.logLiteral, log].join("").cyan, "\n");
        },
        debug: function () {
            if (this.logMute || this.logLevel < 5) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.print([new Date().toISOString().slice(0, 19).replace("T", " "), "[dbg]", __callee(this.logTraces), " ", this.logLiteral, log].join("").blue, "\n");
        },
        log: function () {
            if (this.logMute || this.logLevel < 4) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.print([new Date().toISOString().slice(0, 19).replace("T", " "), "[log]", __callee(this.logTraces), " ", this.logLiteral, log].join("").white, "\n");
        },
        info: function () {
            if (this.logMute || this.logLevel < 3) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.print([new Date().toISOString().slice(0, 19).replace("T", " "), "[inf]", __callee(this.logTraces), " ", this.logLiteral, log].join("").green, "\n");
        },
        warn: function () {
            if (this.logMute || this.logLevel < 2) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.error([new Date().toISOString().slice(0, 19).replace("T", " "), "[wrn]", __callee(this.logTraces), " ", this.logLiteral, log].join("").yellow);
        },
        err: function () {
            if (this.logMute || this.logLevel < 1) {
                return;
            }

            var log = ArrayMap.call(arguments, function (v) {
                return "string" === typeof v ? v : inspect(v);
            }).join(" ");

            util.error([new Date().toISOString().slice(0, 19).replace("T", " "), "[err]", __callee(this.logTraces), " ", this.logLiteral, log].join("").red);
        }
    };

}());