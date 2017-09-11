'use strict';

const STATUS = require("../Process/Status");

class RoundRobin {
  
  constructor(quantum, processes) {
    this.defaultQuantum = quantum;
    this.quantum = quantum;
    this.time = 0;
    this.totalProcess = processes.length;
    
    this.processesReady = processes;
    this.processesBlocked = [];
    this.processesFinished = [];
  }

  updateTime() {
    this.time++;
  }
  
  hasProcess() {
    return this.totalProcess != this.processesFinished.length;
  }
  
  printWithTime(msg) {
    console.log('Tempo ' + this.time + ':' + msg);
  }
  
  verifyUnblocked() {
    this.processesBlocked = this.processesBlocked.filter((process) => {
      if((process.initialTime + process.cycles[process.currentCycle].io) == this.time) {
        this.printWithTime('Processo ' + process.id + ' passou ' + process.cycles[process.currentCycle].io + 'ms bloqueado');
        process.cycles[process.currentCycle].io = 0;
        this.processesReady.push(process.ready());
        process.currentCycle++;
        return false;
      }
      
      return true;
    });
  }
  
  run() {
    
    while(this.hasProcess()) {
      const process = this.processesReady.shift();
      
      this.verifyUnblocked();
      
      if(process) {
        const currentCycle = process.cycles[process.currentCycle];
        
        let quantum = this.quantum;
        
        const timeInCpu = Math.min(currentCycle.cpu, quantum);
        
        this.printWithTime('Processo ' + process.id + ' ganhou a CPU');
        
        // this.quantum+= process.bonus;
        console.log('Processo: ' + process.id + ' - BONUS: ' + process.bonus);
        for(let i = 0; i < timeInCpu; i++) {
          this.updateTime();
          this.verifyUnblocked();
        }
        
        process.inCpu+= timeInCpu;
        
        this.printWithTime('Processo ' + process.id + ' completou seu quanta');
  
        // process.cpuBurtsCounter+= timeInCpu;
        currentCycle.cpu-= timeInCpu;
        process.cycles[process.currentCycle] = currentCycle;
        
        if(currentCycle.cpu > 0) {
          process.usedQuantum+= 1;
          this.processesReady.push(process);
          this.printWithTime('Processo ' + process.id + ' foi para o final da fila');
          if(process.usedQuantum == 2) {
            if(process.bonus > -5) {
              process.bonus-= 1;
            }
            this.quantum+ process.bonus;
            process.usedQuantum = 0;
          }
        } else if(currentCycle.cpu == 0) {
          if(currentCycle.io) {
            if(process.bonus < 5) {
              process.bonus+= (this.quantum - currentCycle.cpu) > 0 ? 1 : 0;
            }
            process.usedQuantum = 0;
            process.initialTime = this.time;
            this.processesBlocked.push(process.block());
            this.printWithTime('Processo ' + process.id + ' foi bloqueado');
          } else {
            process.finishIn = this.time;
            process.usedQuantum = 0;
            this.processesFinished.push(process.finish());
            this.printWithTime('Processo ' + process.id + ' terminou');
          }
        }
      }
        
      this.updateTime();
  
    }
    
    
    console.log('--------------------------------------------------');
    
    this.processesFinished.forEach((process) => {
      console.log('Processo ' + process.id + ': ' + process.inCpu + 'ms, ' + (process.finishIn - process.inCpu) + 'ms, bonus: ' + process.bonus);
    });
    
    console.log('--------------------------------------------------');
      
  }
  
};

module.exports = RoundRobin;