<template>
  <button @click="localCount++">{{ localCount }}</button>
</template>

<script>
import { cloneDeep } from 'lodash-es';
export default {
  name: 'CounterButton',
  data () {
    return {
      localCount: null,
    }
  },
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  emits: {
    'update:count': null,
  },
  watch: {
    count: {
      deep: true,
      immediate: true,
      handler() {
        this.localCount = cloneDeep(this.count);
      },
    },
    localCount: {
      deep: true,
      handler(newValue) {
        this.$emit('update:count', cloneDeep(newValue));
      },
    },
  },
};
</script>
