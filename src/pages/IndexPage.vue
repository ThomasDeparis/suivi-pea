/* eslint-disable */
<template>
  <q-page>
    <q-select
      standout="bg-grey text-white"
      class="q-my-sm"
      v-model="selectedMarketName"
      :options="markets"
      label="Marché"
      :options-dense=true
    />

    <div class="flex flex-center">
      <stock-card v-for="s in currentStock"
        :key="s.isinCode"
        :stock="s"
        :brandIcon="getBrandIcon(s.isinCode)"
      ></stock-card>
    </div>
    <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="selectedPage"
      color="teal"
      :max="getMaxPages()"
      :max-pages="6"
      boundary-numbers
    />
  </div>
  </q-page>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStockMarketStore } from '../stores/stock-market'
import { useLechoBeApiStore } from '../stores/lecho-be-api'

import StockCard from '../components/StockCard.vue'

export default {
  name: 'IndexPage',
  components: {
    StockCard
  },
  setup () {
    const stockStore = useStockMarketStore()
    const marketStore = useLechoBeApiStore()

    // --- stock market data ---
    const markets = computed(() => { return marketStore.markets })
    const selectedMarketName = ref('')

    const currentStock = computed(() => { return stockStore.currentStock })
    const totalStock = computed(() => { return stockStore.totalStock })

    const selectedPage = ref(1)
    const getMaxPages = () => {
      return Math.ceil(totalStock.value / 50)
    }

    watch([selectedMarketName], () => {
      selectedPage.value = 1
      stockStore.fetchMarket(selectedMarketName.value, selectedPage.value)
    })

    watch([selectedPage], () => {
      stockStore.fetchMarket(selectedMarketName.value, selectedPage.value)
    })

    // --- brand icons ---
    const brandIcons = computed(() => { return stockStore.brandIcons })
    const isStockLoaded = computed(() => { return stockStore.isStockLoaded })

    watch(isStockLoaded, () => {
      stockStore.fetchBrandIcons()
    })

    const getBrandIcon = (isinCode) => {
      return brandIcons.value[isinCode]?.icon ?? ''
    }

    return { markets, selectedMarketName, currentStock, totalStock, selectedPage, getMaxPages, getBrandIcon }
  }
}
</script>
