<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Suivi PEA
          <q-badge color="white" text-color="primary" align="top">v0.2</q-badge>
        </q-toolbar-title>

        <div>
          <q-btn flat
            :icon-right="signButton.icon"
            :label="signButton.label"
            @click="signButton.onSign"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from '../stores/user'

const linksList = [
  {
    title: 'Mon portefeuille',
    caption: '',
    icon: 'account_balance_wallet',
    link: '/mywallet'
  },
  {
    title: 'Marchés',
    caption: '',
    icon: 'public',
    link: '/stockmarkets'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const toggleLeftDrawer = () => { leftDrawerOpen.value = !leftDrawerOpen.value }

    const userStore = useUserStore()
    onBeforeMount(() => {
      userStore.fetchUser()
    })

    const user = computed(() => userStore.currentUser)
    const router = useRouter()

    const signButton = computed(() => {
      if (user?.value) {
        return {
          onSign: userStore.signOut,
          label: user?.value.email,
          icon: 'logout'
        }
      } else {
        return {
          onSign: () => router.push({ path: 'signin' }),
          label: 'Se connecter',
          icon: 'login'
        }
      }
    })

    return {
      user,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer,
      signButton
    }
  }
})
</script>
