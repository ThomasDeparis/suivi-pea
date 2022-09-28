<template>
  <q-page padding>
    <p>{{ wallet?.stocks?.length ?? 0 }} actions dans le portefeuille</p>
  </q-page>
</template>

<script>
import { useUserStore } from '../stores/user'
import { computed } from 'vue'

export default {
  name: 'MyWallet',

  setup () {
    const userStore = useUserStore()
    const wallet = computed(() => userStore.wallet)

    return { wallet }
  }
}
</script>
