<!-- eslint-disable vue/multi-word-component-names -->
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

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="selectedPage"
        color="teal"
        :max="getMaxPages()"
        :max-pages="6"
        boundary-numbers
      />
    </div>

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
  name: 'StockMarkets',
  components: {
    StockCard
  },
  setup () {
    const stockStore = useStockMarketStore()
    const marketStore = useLechoBeApiStore()

    // --- stock market data ---
    const markets = computed(() => { return marketStore.markets })
    const selectedMarketName = ref('')

    const currentStock = computed(() => { return stockStore.market.stocks })
    const totalStock = computed(() => { return stockStore.market.totalStocks })

    const selectedPage = ref(1)
    const getMaxPages = () => {
      return Math.ceil(totalStock.value / 50)
    }

    watch([selectedPage, selectedMarketName], ([newPage, newMarket], [_, oldMarket]) => {
      // prevent double api call when changing market
      // because when changing market, need to go to first page of results => triggers one more time with selectedPage
      if (newMarket !== oldMarket && newPage !== 1) {
        selectedPage.value = 1
      } else { stockStore.fetchMarket(selectedMarketName.value, selectedPage.value) }
    })

    // --- brand icons ---
    const brandIcons = computed(() => { return stockStore.brandIcons })
    const isStockLoaded = computed(() => { return stockStore.market.isLoaded })

    watch(isStockLoaded, () => {
      stockStore.fetchBrandIcons()
    })

    const getBrandIcon = (isinCode) => {
      return brandIcons.value[isinCode]?.icon ?? ''
    }

    return {
      markets,
      selectedMarketName,
      currentStock,
      totalStock,
      selectedPage,
      getMaxPages,
      getBrandIcon
    }
  }
}
</script>
