<template>
  <div class="toasts" v-if="toasts.length">
    <div v-for="toast in toasts" class="toast" :class="toastClass[toast.type]">
      <ui-icon class="toast__icon" :icon="toastIcon[toast.type]" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

const toastClass = {
  'success': 'toast_success',
  'error': 'toast_error'
};

const toastIcon = {
  'success': 'check-circle',
  'error': 'alert-circle'
}

export default {
  name: 'TheToaster',
  data() {
    return {
      toasts: [],
      toastClass: toastClass,
      toastIcon: toastIcon,
      timersId:[]
    }
  },
  methods: {
    success(message) {
      this.toasts.push({type: 'success', message: message});
      let timerId = setTimeout(() => this.removeToast(), 5000);
      this.timersId.push(timerId);
    },
    error(message) {
      this.toasts.push({type: 'error', message: message});
      let timerId = setTimeout(() => this.removeToast(), 5000);
      this.timersId.push(timerId);
    },
    removeToast() {
      this.toasts.shift();
    }
  },
  beforeUnmount() {
    let timerId;
    for(timerId in this.timersId) {
      clearTimeout(this.timersId[timerId]);
    }
  },
  components: { UiIcon },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
