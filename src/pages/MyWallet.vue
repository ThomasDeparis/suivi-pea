<template>
  <q-page>
    <q-select
      standout="bg-grey text-white"
      class="q-my-sm"
      v-model="selectedWallet"
      :options="userWallets"
      label="Portefeuilles"
      :options-dense=true
      option-label="name"
      option-value="id"
    />
    <q-table
      title="Actions"
      :rows="selectedWallet?.stocks"
      :columns="columns"
      row-key="id"
      @row-click="showDetail"
    >
    </q-table>
  </q-page>
</template>

<script>
import { useUserStore } from '../stores/user'
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import StockDetailDialog from '../components/StockDetailDialog.vue'

export default {
  name: 'MyWallet',

  setup () {
    const userStore = useUserStore()
    const userWallets = computed(() => userStore.wallets)
    const selectedWallet = ref('')

    const columns = [
      { name: 'isinCode', align: 'center', label: 'Code ISIN', field: 'isinCode' },
      { name: 'quantity', label: 'Quantité', field: 'quantity' },
      { name: 'avgPrice', label: 'Prix achat moyen', field: 'averageUnitPrice' }
    ]

    // --- detail dialog ---
    const $q = useQuasar()
    const showDetail = (_, row) => {
      $q.dialog({
        component: StockDetailDialog,
        componentProps: { stockUrn: row?.urn }
      })
    }

    return { userWallets, selectedWallet, columns, showDetail }
  }
}
</script>
