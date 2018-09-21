var through = require('through');

module.exports = function (sep, opts) {
    if (typeof sep === 'object') {
        opts = sep;
        sep = opts.sep;
    }
    if (!opts) opts = {};
    
    var num = 0;
    var tr = through(function (buf) {
        if (opts.end) {
            this.emit('data', buf);
            this.emit('data', sep);
        }
        else {
            if (num > 0) {
                this.emit('data', sep);
            }
            this.emit('data', buf);
        }
        num ++;
    });
    
    return tr;
};
