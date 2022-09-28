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
          {{ user?.email }}
        </q-toolbar-title>

        <div>
          <q-btn flat round dense :icon="signIcon" aria-label="Se déconnecter" @click="signOut" />
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
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from '../stores/user'

const linksList = [
  {
    title: 'Se connecter',
    caption: '',
    icon: 'account',
    link: '/signin'
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
    const signIcon = computed(() => user?.value ? 'logout' : 'login')

    const signOut = () => {
      userStore.signOut()
    }

    return {
      user,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer,
      signOut,
      signIcon
    }
  }
})
</script>
