var loklak = require('loklak');
var child_process = require('child_process');

var prev = '';

//init
child_process.exec('echo -n "12" > /sys/class/gpio/export');
child_process.exec('echo -n "out" > /sys/class/gpio/gpio12/direction');

setInterval(function() {
    loklak.search({
        q: 'nyc',
        count: 1
    }, function(data) {
        if (data && data.statuses[0] && data.statuses[0].id_str && prev != data.statuses[0].id_str) {
            console.log("[" + Date() + "]:" + data.statuses[0].screen_name + ' says:' + data.statuses[0].text);
            prev = data.statuses[0].id_str;
            child_process.exec('echo -n "1" > /sys/class/gpio/gpio12/value');
            setTimeout(function() {
                child_process.exec('echo -n "0" > /sys/class/gpio/gpio12/value');
            }, 2000);
        }
        process.stdout.write('.');
    });
}, 6000)
