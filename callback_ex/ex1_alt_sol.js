var util = require('../util/util');

// **************************************
// The old-n-busted callback way

function getFile(file) {
    util.fakeAjax(file, function(text) {
        respState[file] = { resp: text, isDisplayed: false };
        print();
    });
}
/*
    {
        resp: resp,
        isDisplayed: true|false
    }
*/
var respState = {};
var fileUrls = ["file1", "file2", "file3"];

function print(url, resp) {
    for (var fileUrl of fileUrls) {
        if (respState[fileUrl]) {
            if (!respState[fileUrl].isDisplayed) {
                util.output(respState[fileUrl].resp);
                respState[fileUrl].isDisplayed = true;
            }
        } else {
            return false;
        }
    }
    util.output("Complete!!");
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");