var joinStream = require('../');
var split = require('event-stream').split;

process.stdin
    .pipe(split())
    .pipe(joinStream(','))
    .pipe(process.stdout)
;
