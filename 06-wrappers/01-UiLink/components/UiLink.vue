<template>
  <template v-if="this.$attrs.tag === 'router-link'">
    <router-link class="link" :to="this.$attrs.to"><slot/></router-link>
  </template>
  <template v-else-if="this.$attrs.tag === 'a'">
    <a class="link"><slot/></a>
  </template>
  <template v-else>
    <router-link class="link" :to="this.$attrs.to"><slot/></router-link>
  </template>
</template>

<script>
export default {
  name: 'UiLink',
  //inheritAttrs: false,
  created() {
    console.log(this.$attrs);
  }
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
