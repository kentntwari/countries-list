<script setup lang="ts">
import { Navigation } from '@/components/Navigation'
</script>

<template>
  <header class="w-full bg-white px-4 shadow-sm">
    <Navigation />
  </header>
  <main class="px-4">
    <RouterView :key="$route.fullPath" />
  </main>
</template>
