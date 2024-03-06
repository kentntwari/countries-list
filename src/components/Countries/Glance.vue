<script setup lang="ts">
defineProps<{
  title: string
  data?: string
}>()
</script>

<template>
  <span class="font-light"
    ><strong class="font-semibold">{{ title }}: </strong>{{ !data ? '' : data }}</span
  >
</template>
