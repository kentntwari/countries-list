<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '@vueuse/core'

import { Icon } from '@iconify/vue'
import { UseImage as Image } from '@vueuse/components'

import Glance from '@/components/Countries/Glance.vue'
import FetchBorder from '@/components/Countries/FetchBorder.vue'

type Country = {
  name: {
    common: string
    official: string
    nativeName: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
  flags: {
    svg: string
    png: string
    alt: string
  }
  tld: Array<string> | string
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  capital: Array<string> | string
  population: number | string
  region: string
  subregion: Array<string> | string
  languages: {
    [key: string]: string
  }
  borders: Array<string>
}

const route = useRoute()

const url = computed(() => {
  const basePath = 'https://restcountries.com/v3.1/name'
  const params = route.params.country
  const query = [
    'name',
    'flags',
    'population',
    'region',
    'subregion',
    'capital',
    'tld',
    'currencies',
    'languages',
    'borders'
  ] 

  return `${basePath}/${params}?fullText=true&fields=${query.join(',')}`
})

const { isFetching, data: country } = useFetch<Country[]>(url).get().json<Country[]>()
</script>

<template>
  <button
    type="button"
    class="mt-6 h-8 px-6 bg-white flex items-center gap-2 rounded-sm shadow-sm"
    @click="$router.push('/')"
  >
    <Icon icon="ph:arrow-left-thin" width="18px" />
    <span class="text-[14px] leading-[20px]">Back</span>
  </button>

  <div class="mt-16 w-full">
    <template v-if="isFetching">Loading...</template>
    <template v-else>
      <div
        v-for="{
          name,
          capital,
          flags,
          population,
          region,
          subregion,
          tld,
          currencies,
          languages,
          borders
        } in country"
        class="flex flex-col gap-[44px]"
      >
        <Image :src="flags.svg" :alt="flags.alt" class="w-full aspect-[1.39/1] object-cover">
          <template #loading>Load Image ...</template>
        </Image>

        <section class="space-y-4">
          <h2 class="font-extrabold">{{ name.common }}</h2>

        
          <div class="flex flex-col gap-8">
            <p class="block text-[14px] leading-[32px]">
              <Glance
                title="Native Name"
                :data="name.nativeName[Object.keys(name.nativeName)[0] as string]?.common"
              />
              <br />

              <Glance
                title="Population"
                :data="typeof population === 'number' ? population.toString() : population"
              />
              <br />

              <Glance title="Region" :data="region" />
              <br />

              <Glance
                title="Sub Region"
                :data="typeof subregion === 'object' ? subregion.toString() : subregion"
              />
              <br />

              <Glance
                title="Capital"
                :data="typeof capital === 'object' ? capital.toString() : capital"
              />
              <br />
            </p>

            <p class="block text-[14px] leading-[32px]">
              <Glance
                title="Top Level Domain"
                :data="typeof tld === 'object' ? tld.toString() : tld"
              />
              <br />

              <Glance
                title="Currencies"
                :data="currencies[Object.keys(currencies)[0] as string]?.name"
              />
              <br />

              <Glance title="Languages" :data="Object.values(languages).toString()" />
            </p>

            <div v-if="borders.length > 0" class="flex flex-col gap-4">
              <p class="font-semibold text-[16px] leading-[24px]">Border Countries:</p>
              <div>
                <span
                  v-for="border in borders"
                  class="mr-[10px] min-w-24 bg-white rounded-sm shadow-sm"
                >
                  <FetchBorder :border="border.toLowerCase()">
                    <template #="{ country }">
                      <button type="button" @click="$router.push(`/${country.toLowerCase()}`)">
                        {{ country }}
                      </button>
                    </template>
                  </FetchBorder>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>
