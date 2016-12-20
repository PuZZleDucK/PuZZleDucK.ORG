
/*global document, setInterval, window, console, d3, this, Worker */

"use strict";

var min = function (xs) {
    var m = 1000000;
    xs.every(function (v) {   // v,i,a: Value Index Array
        if (v < m) {
            m = v;
        }
    });
    return m;
};
var max = function (xs) {
    var m = 0;
    xs.every(function (v) {
        if (v > m) {
            m = v;
        }
    });
    return m;
};

var padding = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
    hor: function () {
        return 100;
    }, //no 'this' in strict...
    vert: function () {
        return 100;
    }
};

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var chars = alphabet.split('');
var key_data = [];
chars.forEach(function (v) {
    key_data.push({char: v, count: 0});
});

var update_keys = function (key_data, new_data) {
    chars.forEach(function (v, i) {
        var old_count = key_data[i].count;
        var add_count = new_data[i].count;
        key_data[i] = {char: v, count: (old_count + add_count)};
    });
};

var max_key_value = function () {
    var m = 0;
    key_data.forEach(function (v) {
        if (v.count > m) {
            m = v.count;
        }
    });
    return m;
};

var a_char = 'a';
var a_char_code = a_char.charCodeAt(0);
var z_char = 'z';
var z_char_code = z_char.charCodeAt(0);

var log_key = function (evt) {
    var raw_value = String.fromCharCode(evt.keyCode);
    var value = raw_value.toLowerCase().charCodeAt(0) - a_char_code;
    if (value >= 0 && value <= z_char_code - a_char_code) {
        key_data[value].count += 1;
    }
    return;
};

window.addEventListener("keydown", log_key, true);

window.onload = function (win) {
    var data = key_data;
    var base_width = document.body.clientWidth;
    var base_height = document.body.clientHeight;
    var bar_width = (base_width - padding.hor()) / data.length;
    var height_scale = d3.scale.linear()
        .domain([0, max_key_value()])
        .range([1, base_height - padding.vert()]);

    var doc = document.documentElement;
    doc.ondragover = function () {
        doc.ondragover.className = 'hover';
        return false;
    };
    doc.ondragend = function () {
        doc.ondragend.className = '';
        return false;
    };
    doc.ondrop = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        doc.ondrop.className = '';
        var files = event.dataTransfer.files;
        [].forEach.call(files, function (ignore, i) {
            var myWorker = new Worker("FileRead.js");
            myWorker.postMessage(files[i]);
            myWorker.onmessage = function (e) {
                //console.log('Message received from worker: '+e.data);
                update_keys(key_data, e.data);
            };
        });
        return false;
    };

    var chart = d3.select("#bar-chart")
        .style("width", base_width)
        .style("height", base_height);
    chart.append("rect")
        .style("stroke", "red")
        .style("fill", "grey")
        .attr("class", "bg")
        .attr("width", base_width - 2)
        .attr("height", base_height - 2)
        .attr("x", 1)
        .attr("y", 1);
    chart.append("text")
        .text("Live Keystroke Frequency Counter and Drop File Character Analysis")
        .attr("x", 50)
        .attr("y", 50)
        .style("font-size", 25)
        .style("stroke", "Black")
        .style("fill", "Black");
    chart.append("text")
        .text("Type keys to view live kestroke analysis.")
        .attr("x", 70)
        .attr("y", 70)
        .style("font-size", 20)
        .style("stroke", "Black")
        .style("fill", "Black");
    chart.append("text")
        .text("Or drop text file on background to analyse character frequency profile.")
        .attr("x", 70)
        .attr("y", 90)
        .style("font-size", 20)
        .style("stroke", "Black")
        .style("fill", "Black");
    var chart_bars = chart.selectAll(".bar");
    var chart_join = chart_bars.data(data);
    chart_join.enter().append("svg:rect")
        .attr("class", "bar")
        .attr("width", bar_width - 1)
        .attr("height", function (d) {
            return height_scale(d.count);
        })
        .style("fill", "blue")
        .attr("x", function (d, i) {
            if (undefined !== win.undefined) {
                undefined(d);
            }
            return (i * bar_width) + padding.left;
        })
        .attr("y", function (d) {
            return (base_height - padding.bottom) - height_scale(d.count);
        });

    chart.selectAll(".axis").data(data)
        .enter().append("rect")
        .text(function (d) {
            return d.char;
        })
        .style("fill", "red")
        .attr("class", "axis")
        .attr("width", bar_width - 1)
        .attr("height", bar_width - 1)
        .attr("x", function (d, i) {
            if (undefined !== win.undefined) {
                undefined(d);
            }
            return (i * bar_width) + padding.left;
        })
        .attr("y", function () {
            return base_height - (padding.bottom - 6);
        });
    chart.selectAll(".x-axis").data(data)
        .enter().append("text")
        .text(function (d) {
            return d.char;
        })
        .attr("class", "x-axis")
        .style("fill", "white")
        .attr("x", function (d, i) {
            if (undefined !== win.undefined) {
                undefined(d);
            }
            return (i * bar_width) + padding.left;
        })
        .attr("dx", 3)
        .attr("y", function () {
            return (base_height - (padding.bottom - 15));
        });



    var tick = function () {
        height_scale = d3.scale.linear()
            .domain([0, max_key_value()])
            .range([1, base_height - padding.vert()]);
        var u_chart = d3.select("#bar-chart");
        var u_chart_bars = u_chart.selectAll(".bar");
        var u_chart_join = u_chart_bars.data(data)
            .style("width", win.innerWidth)
            .style("height", win.base_height);
        u_chart_join.data(data).transition()
            .attr("height", function (d) {
                return height_scale(d.count);
            })
            .attr("y", function (d) {
                return (base_height - padding.bottom) - height_scale(d.count);
            });
    };
    setInterval(tick, 100);//1000 = 1 second    printTick


};//onload



