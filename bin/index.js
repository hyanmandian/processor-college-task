'use strict';

const OS = require("./../index.js");

const Process = OS.Process;
const RoundRobin = OS.Algorithms.RoundRobin;

const QUANTUM = 10;

let processes = [];

processes.push(new Process([
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 5,
    'io': 12,
  },
  {
    'cpu': 25,
    'io': 4,
  },
  {
    'cpu': 10,
  },
]));

processes.push(new Process([
  {
    'cpu': 25,
    'io': 12,
  },
  {
    'cpu': 25,
    'io': 12,
  },
  {
    'cpu': 25,
    'io': 12,
  },
  {
    'cpu': 25,
    'io': 12,
  },
  {
    'cpu': 25,
    'io': 12,
  },
  {
    'cpu': 25,
    'io': 14,
  },
  {
    'cpu': 15,
  },
]));

processes.push(new Process([
  {
    'cpu': 100,
    'io': 5,
  },
  {
    'cpu': 100,
    'io': 5,
  },
  {
    'cpu': 100,
    'io': 5,
  },
  {
    'cpu': 100,
    'io': 5,
  },
  {
    'cpu': 100,
    'io': 5,
  },
  {
    'cpu': 100,
    'io': 5,
  },
  {
    'cpu': 100,
    'io': 5,
  },
  {
    'cpu': 10,
  },
]));

const algorithm = new RoundRobin(QUANTUM, processes);

algorithm.run();