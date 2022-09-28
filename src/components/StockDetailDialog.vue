<template>
  <q-dialog ref="dialogRef" position="bottom">
    <q-card>
      <q-card-section class="row items-center">
        <brand-icon class="absolute-center" :iconLink="brandIcon"></brand-icon>
        <q-space />
          <q-btn class="q-pa-none" v-close-popup flat round dense  icon="close" />
      </q-card-section>
      <q-card-section class="row items-center q-py-none">
        <div class="text-h5 q-mx-sm">{{ stock.name }}</div>
        <div class="text-subtitle3">{{ stock.isinCode }}</div>
        <q-space />
      </q-card-section>

      <q-card-section>
        <p>{{ stock?.values?.lastValue }} {{ stock?.currency }}</p>
        <p>{{ stock?.values?.variation }} %</p>
        <p>{{ stock?.values?.lastTime }}</p>
      </q-card-section>
      <q-card-section>
        <p>{{ stock?.dividend }} {{ stock?.currency }}</p>
        <p>{{ stock?.dividendPercent }} %</p>
      </q-card-section>

      <q-card-actions class="items-center">
        <q-space />
        <q-btn icon="add">Nouvel ordre</q-btn>
        <q-space />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, onUnmounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useStockMarketStore } from '../stores/stock-market'
import BrandIcon from './BrandIcon.vue'

export default {
  name: 'StockDetailDialog',
  props: ['stockUrn'],
  components: {
    BrandIcon
  },

  setup (props) {
    const stockStore = useStockMarketStore()
    stockStore.fetchStockDetail(props.stockUrn)
    const stock = computed(() => stockStore.stockDetail)

    // required default props and methods from q-dialog, need to be setup for good rendering
    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

    // same here, for default q-dialog events
    const defineEmits = () => ([
      ...useDialogPluginComponent.emits
    ])

    const brandIcons = computed(() => stockStore.brandIcons)
    const brandIcon = computed(() => brandIcons.value[stock?.value?.isinCode]?.icon ?? '')

    onUnmounted(() => {
      stockStore.deleteStockDetail()
    })

    return { stock, dialogRef, onDialogHide, onDialogCancel, defineEmits, brandIcon }
  }
}
</script>

<!-- name: result?.fullName?.default,
            isinCode: result?.isinCode,
            currency: result?.currency,
            dividend: result?.consensus?.dividend?.previousYearValue, // dividend received year y for y-1 results
            dividendPercent: result?.consensus?.dividendReturn?.previousYearValue,
            values: {
              lastValue: result?.values?.lastPrice,
              variation: result?.values?.dayChangePercentage,
              lastTime: result.values?.lastTime
            },
            marketCap: result?.consensus?.marketCap -->
