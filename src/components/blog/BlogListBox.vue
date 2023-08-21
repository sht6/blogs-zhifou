<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <span class="text-body-1">{{ title }}</span>
      <slot name="actionBtn"></slot>
    </div>
    <v-divider class="mt-2"></v-divider>
    <slot name="listContent"></slot>
  </v-container>
</template>

<script>
export default {
  name: "",
  props: {
    title: { type: String, required: true },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="less"></style>
