var co = require('co');
var util = require('../util/util');

function getFile(file) {
    return new Promise(function(resolve) {
        util.fakeAjax(file, resolve);
    });
}

co(function* loadFiles() {
        // Request all files at once in
        // "parallel" via `getFile(..)`.
        var p1 = getFile("file1");
        var p2 = getFile("file2");
        var p3 = getFile("file3");

        // Render as each one finishes,
        // but only once previous rendering
        // is done.
        util.output(yield p1);
        util.output(yield p2);
        util.output(yield p3);
    })
    .then(function() {
        util.output("Complete!");
    });