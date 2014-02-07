# noboxout-log [![Build Status](https://secure.travis-ci.org/llafuente/noboxout-log.png?branch=master)](http://travis-ci.org/llafuente/noboxout-log)

## Introduction

Basic log with: timestamps, colors and traces to stdout/stderr.
Perfect for small aplications.
Modify console.log/info adding trace parameter.

## Example

```
2014-02-07 23:10:05[vrb]test.js:5 verbose
2014-02-07 23:10:05[dbg]test.js:6 debug
2014-02-07 23:10:05[log]test.js:7 log
2014-02-07 23:10:05[inf]test.js:8 info
2014-02-07 23:10:05[wrn]test.js:9 warning
2014-02-07 23:10:05[err]test.js:10 error
```

### Log levels

To edit level use: log.logLevel = &lt;integer&gt;

* verbose - stdout (6)
* debug - stdout (5)
* log - stdout (4)
* info - stdout (3)
* warning - stderr (2)
* error - stderr (1)

### Mute log

```js
log.logMute = true;
```


### Add to literal

Use it to add some text after header. like:

```js
// before
// 2014-02-07 23:10:05[vrb]test.js:5 verbose

log.logLiteral = "[xxx]";

// after
// 2014-02-07 23:10:05[vrb]test.js:5[xxx] verbose
```


## Install

With [npm](http://npmjs.org) do:

```

npm install noboxout-log

```

## test (travis-ci ready!)


```

npm test
// or
node test.js

```

## license


MIT.
