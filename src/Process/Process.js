'use strict';

const STATUS = require("./Status");

const DEFAULT_STATUS = STATUS.READY;

let i = 0;

class Process {
  
  constructor(cycles) {
    this.id = i++;
    this.timeBlocked = 0;
    
    this.ready();

    this.bonus = 0;
    this.usedQuantum = 0;
    this.currentCycle = 0;
    this.inCpu = 0;
    this.paused = 0;
    this.finishIn = 0;
    this.initialTime = 0;
    this.cycles = cycles;
  };

  finish() {
    this.status = STATUS.FINISHED;
  
    return this;
  }
  
  block() {
    this.status = STATUS.BLOCKED;
    
    return this;
  }
  
  ready() {
    this.status = STATUS.READY;
  
    return this;
  }
  
};

module.exports = Process;