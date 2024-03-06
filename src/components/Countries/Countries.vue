<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useFetch, useDebounce } from '@vueuse/core'

import { Icon } from '@iconify/vue'

import Country from './Country.vue'

type Country = {
  name: { common: string; official: string;[key: string]: unknown }
  flags: { svg: string; png: string; alt: string }
  capital: Array<string> | string
  population: number | string
  region: string
}

const regions = ['africa', 'america', 'asia', 'europe', 'oceania'] as const

const selectedRegion = ref<typeof regions[number]>()

const isToggled = ref(false)

const searchTerm = ref('')

const debounced = useDebounce(searchTerm, 500)

watch(
  () => selectedRegion.value,
  (newVal) => {
    if (newVal) {
      searchTerm.value = ''
    }
  }
)

const url = computed(() => {
  switch (true) {
    case /^\s*$/.test(debounced.value): {
      if (typeof selectedRegion.value !== 'undefined' && regions.includes(selectedRegion.value))
        return `https://restcountries.com/v3.1/region/${selectedRegion.value}?fields=name,flags,population,region,capital`
      return 'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital'
    }

    default:
      return `https://restcountries.com/v3.1/name/${debounced.value}?fields=name,flags,population,region,capital`
  }
})

const { isFetching, data } = useFetch<Country[]>(url, { refetch: true }).get().json<Country[]>()
</script>

<template>
  <div class="relative">
    <input v-model="searchTerm"
      class="w-full appearance-none bg-white pl-16 h-12 flex items-center text-[12px] placeholder:text-[#c4c4c4] focus:outline-none rounded-[5px] shadow-sm"
      placeholder="search for a country..." aria-label="Search for a country"
      autocomplete="false" role="searchInput" type="text"
      @input="selectedRegion = undefined" @keydown="isToggled = false" />

    <Icon icon="ph:magnifying-glass" width="16px"
      class="absolute top-1/2 left-8 -translate-y-1/2 text-[#b2b2b2]" />
  </div>

  <button type="button" id="Filter-region"
    class="group relative mt-8 w-[200px] text-[12px]" role="Filter by region">
    <div class="bg-white h-12 px-6 flex items-center justify-between rounded-[5px]"
      @click="isToggled = !isToggled">
      <span class="text-[12px] capitalize">{{
      !selectedRegion ? 'Filter by region' : selectedRegion
    }}</span>
      <Icon icon="mdi:chevron-down" width="16px"
        :class="[isToggled ? 'rotate-180' : 'rotate-0']" />
    </div>
    <div v-if="isToggled"
      class="absolute top-[52px] z-10 w-full px-6 py-4 bg-white flex flex-col gap-3 rounded-[5px] shadow-sm">


      <span v-for="region in regions" class="text-left text-[12px] capitalize"
        @click="selectedRegion = region">{{
      region }}</span>
    </div>
  </button>

  <div
    class="mt-8 grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] justify-center gap-10">
    <template v-if="isFetching">Loading...</template>
    <article v-for="country in data"
      class="m-auto aspect-[1/1.27] bg-white rounded-[5px] shadow-md">
      <RouterLink :to="{
      name: 'country',
      params: { country: country.name.common.toLowerCase() }
    }" class="w-full h-full">
        <Country :name="country.name.common" :flag="country.flags"
          :capital="country.capital" :population="country.population"
          :region="country.region" />
      </RouterLink>
    </article>
  </div>
</template>
