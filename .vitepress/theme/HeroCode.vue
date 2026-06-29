<template>
  <div class="hero-code" v-html="html" />
</template>

<script setup>
import { data } from './heroCode.data.ts'
const html = data
</script>

<style scoped>
.hero-code {
  border-radius: 12px;
  font-size: 14px;
  overflow: visible;
}

.hero-code :deep(pre) {
  margin: 0;
  padding: 16px;
  border-radius: 12px;
  white-space: pre;
  overflow-x: auto;
}
</style>
