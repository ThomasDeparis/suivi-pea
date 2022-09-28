<template>
  <q-avatar v-if="iconLink === ''"
    rounded
    icon="wallet"
    color="teal"
    text-color="white">
  </q-avatar>
  <q-avatar v-else rounded size="xl">
    <img :src="iconLink" />
  </q-avatar>
</template>

<script>
export default {
  name: 'BrandIcon',
  props: ['iconLink']
}
</script>
