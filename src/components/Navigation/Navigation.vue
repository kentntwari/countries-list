<template>
  <nav class="h-20 flex items-center justify-between">
    <RouterLink to="/">
      <div class="font-extrabold text-[14px] leading-[20px]">Where in the world</div>
    </RouterLink>
    <button type="button" title="theme switcher" class="flex items-center gap-2" @click="toggleDark()">
      <Icon icon="ph:moon" width="16px" />
      <span class="font-semibold text-[12px] capitalize">Dark mode</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleDark = useToggle(isDark)
</script>
