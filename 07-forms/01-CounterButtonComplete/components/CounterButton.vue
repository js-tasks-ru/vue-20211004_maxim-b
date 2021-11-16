<template>
  <button @click="localCount++">{{ localCount }}</button>
</template>

<script>
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
        this.localCount = this.count;
      },
    },
    localCount: {
      deep: true,
      handler(newValue) {
        this.$emit('update:count', newValue);
      },
    },
  },
};
</script>
