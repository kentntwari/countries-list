<script setup lang="ts">
import { useFetch } from '@vueuse/core'

type Country = {
  name: {
    common: string
    official: string
    [key: string]: unknown
  }
}

const props = defineProps<{
  border: string
}>()

const { isFetching, data: country } = useFetch<Country>(
  `https://restcountries.com/v3.1/alpha/${props.border}?fields=name`
)
  .get()
  .json<Country>()
</script>

<template>
  <template v-if="isFetching">Loading...</template>

  <template v-else>
    <slot :country="!country ? '' : country.name.common"></slot>
  </template>
</template>
