 import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const vm = createApp({
  data() {
    return {
      multiplicand: 0,
      factor: 0,
      outcome: 0,
      operation: undefined,
      operations: {
        sum: '+',
        subtract: '-',
        multiply: '*',
        divide: '/'
      }
    }
  },
  watch: {
    operation(NewValue) {
            this.outcome = eval(this.multiplicand  + this.operations[NewValue] +  this.factor);
    },
    multiplicand(NewValue){
      let operation  = this.operation;
      this.outcome = eval(this.multiplicand  + this.operations[operation] +  this.factor);
    },
    factor(NewValue){
      let operation = this.operation;
      this.outcome = eval(this.multiplicand  + this.operations[operation] +  this.factor);
    }
  }
}).mount('#app');

window.vm = vm;
