var util = require('../util/util');

function getFile(file) {
    var resp, data;

    util.fakeAjax(file, function(text) {
        if (!resp) data = text;
        else resp(text);
    });

    return function th(cb) {
        if (data) cb(data);
        else resp = cb;
    };
}

// request all files at once in "parallel"
var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");

th1(function ready(text) {
    util.output(text);
    th2(function ready(text) {
        util.output(text);
        th3(function ready(text) {
            util.output(text);
            util.output("Complete!");
        });
    });
});