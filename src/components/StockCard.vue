<template>
  <q-card class="my-card q-ma-md shadow-3" :key=isinCode>
    <q-list>
      <q-item>
        <q-item-section class="items-center">
          <brand-icon :iconLink="brandIcon"></brand-icon>
        </q-item-section>
      </q-item>
      <q-item class="text-center text-bold">
        <q-item-section @click="showDetail()">{{name}}</q-item-section>
      </q-item>

      <q-item class="text-center">
        <q-item-section :class="variationColor">{{ lastValue + ' ' + currencyChar }}</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import StockDetailDialog from './StockDetailDialog.vue'
import BrandIcon from './BrandIcon.vue'
import { useQuasar } from 'quasar'

export default {
  name: 'StockCard',
  props: ['stock', 'brandIcon'],
  components: {
    BrandIcon
  },

  setup (props) {
    const getCurrencyChar = () => {
      let cchar = ''
      if (props.stock.currency === 'USD') {
        cchar = '$'
      } else if (props.stock.currency === 'EUR') {
        cchar = '€'
      }
      return cchar
    }

    // --- detail dialog ---
    const $q = useQuasar()
    const showDetail = () => {
      $q.dialog({
        component: StockDetailDialog,
        componentProps: { stockUrn: props.stock.urn }
      })
    }

    return {
      isinCode: props.stock.isinCode,
      name: props.stock.name,
      lastValue: props.stock.lastValue,
      currency: props.stock.currency,
      currencyChar: getCurrencyChar(),
      variationColor: props.stock?.variation > 0 ? 'text-green' : 'text-red',
      urn: props.stock.urn,
      showDetail
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
  justifyContent: "center"
  display: "flex"
</style>
