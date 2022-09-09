<template>
  <q-card class="my-card q-ma-md" :key=isinCode>
    <q-list>
      <q-item>
        <q-item-section class="items-center">
          <q-avatar v-if="brandIcon === ''"
            rounded
            icon="wallet"
            color="teal"
            text-color="white">
          </q-avatar>
          <q-avatar v-else rounded size="xl">
            <img :src="brandIcon" />
          </q-avatar>
        </q-item-section>
      </q-item>
      <q-item class="text-center text-bold">
        <q-item-section>{{name}}</q-item-section>
      </q-item>

      <q-item class="text-center">
        <q-item-section :class="variationColor">{{ lastValue + ' ' + currencyChar }}</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: 'StockCard',
  props: ['stock', 'brandIcon'],
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

    return {
      isinCode: props.stock.isinCode,
      name: props.stock.name,
      lastValue: props.stock.lastValue,
      currency: props.stock.currency,
      currencyChar: getCurrencyChar(),
      variationColor: props.stock?.variation > 0 ? 'text-green' : 'text-red'
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
