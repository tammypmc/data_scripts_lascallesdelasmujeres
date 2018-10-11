var test = require('tap').test;
var joinStream = require('../');
var split = require('event-stream').split;
var through = require('through');
var Stream = require('stream');

test('join a split stream', function (t) {
    t.plan(1);
    
    var rs = new Stream;
    rs.readable = true;
    
    var data = '';
    var ws = through(
        function (buf) { data += buf },
        function () {
            t.equal(data, 'abc,def,hi,jkl,');
        }
    );
    
    rs
        .pipe(split())
        .pipe(joinStream(',', { end : true }))
        .pipe(ws)
    ;
    
    rs.emit('data', 'abc\ndef\nhi\njkl\n');
    rs.emit('end');
});
