import {defineComponent} from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      required: true,
      default: 0,
      readonly: false
    },
  },
  // Шаблон лучше держать максимально простым, а логику выносить в методы
  computed: {
    counter: {
      get() {
        return this.count
      },
      set(value) {
        this.$emit('update:count', value)
      },
    },
  },

  // Шаблон потребуется отредактировать
  template: `
    <button type="button" @click="counter++">{{ counter }}</button>`,
});
