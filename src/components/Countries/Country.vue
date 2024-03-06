<script setup lang="ts">
import { useImage } from '@vueuse/core'

const props = defineProps<{
  name: string
  flag: { svg: string; alt: string }
  capital: Array<string> | string
  population: number | string
  region: string
}>()

const { isLoading } = useImage({ src: props.flag.svg })
</script>

<template>
  <div class="w-[264px] space-y-6">
    <div v-if="isLoading">Loading...</div>
    <img v-else :src="props.flag.svg" :alt="props.flag.alt" class="w-full h-40 object-cover rounded-t-[5px]" />
    <div class="px-6 space-y-4">
      <span class="font-extrabold text-[18px] leading-[26px]">{{ name }}</span>
      <div class="group space-y-2 text-[14px] leading-[16px]">
        <span class="block">Population:{{ population }}</span>
        <span class="block">Region:{{ region }}</span>
        <span class="block">Capital:{{ typeof capital === 'object' ? capital[0] : capital }}</span>
      </div>
    </div>
  </div>
</template>
