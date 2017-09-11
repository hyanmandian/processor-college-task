'use strict';

const Process = require('./src/Process/Process');
const RoundRobin = require('./src/Algorithms/RoundRobin');

module.exports = {
  'Process': Process,
  'Algorithms': {
    'RoundRobin': RoundRobin,  
  },
};   