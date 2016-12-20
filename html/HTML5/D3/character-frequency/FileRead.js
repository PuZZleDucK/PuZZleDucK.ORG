
/*global document, setInterval, window, console, d3, FileReader, self, postMessage */

"use strict";

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var chars = alphabet.split('');
var key_data = [];
chars.forEach(function (v) {
    key_data.push({char: v, count: 0});
    return;
});

var a_char = 'a';
var a_char_code = a_char.charCodeAt(0);
var z_char = 'z';
var z_char_code = z_char.charCodeAt(0);

self.onmessage = function (e) {
    console.log('Message from main:');
    console.log(e.data);
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        var data_chars = e.target.result.split("");
        data_chars.forEach(function (val) {
            var value = val.toLowerCase().charCodeAt(0) - a_char_code;
            if (value >= 0 && value <= z_char_code - a_char_code) {
                key_data[value].count += 1;
            }
        });
        postMessage(key_data);
    };
    fileReader.onerror = function (e) {
        console.log("Load error!");
        console.log(e);
    };
    fileReader.readAsText(e.data);
//  postMessage("Response("+e.data+").");
};


