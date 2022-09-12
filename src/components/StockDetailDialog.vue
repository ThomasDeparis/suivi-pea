<template>
  <q-dialog ref="dialogRef" position="bottom">
    <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h5">{{ stock.name }}</div>
          <q-space />
          <div class="text-h6">bleble</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          youpi
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>
import { computed, onUnmounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useStockMarketStore } from '../stores/stock-market'

export default {
  name: 'StockDetailDialog',
  props: ['stockUrn'],

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

    onUnmounted(() => {
      stockStore.deleteStockDetail()
    })

    return { stock, dialogRef, onDialogHide, onDialogCancel, defineEmits }
  }
}
</script>
