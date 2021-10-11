 import { createApp } from './vendor/vue.esm-browser.js';

const operations = {
  sum: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
};

// Создайте Vue приложение
const vm = createApp({
  data() {
    return {
      multiplicand: 0,
      factor: 0,
      operation: undefined,
      operations: operations
    }
  },
  computed: {
    outcome() {
      return this.operations[this.operation]? eval(this.multiplicand + this.operations[this.operation] + this.factor):0;
    }
  }
}).mount('#app');
