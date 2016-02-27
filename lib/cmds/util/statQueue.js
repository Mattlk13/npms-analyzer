'use strict';

const log = require('npmlog');

function statQueue(queue, interval) {
    // Do nothing if loglevel is higher than stat
    if (log.levels[log.level] < log.level.stat) {
        return () => {};
    }

    const intervalId = setInterval(() => {
        queue.stat()
        .then((stat) => {
            log.stat('queue', 'Queue stat', stat);
        }, (err) => {
            log.error('queue', 'Queue stat failed', { err });
        })
        .done();
    }, interval || 15000)
    .unref();

    return () => {
        clearInterval(intervalId);
    };
}

module.exports = statQueue;