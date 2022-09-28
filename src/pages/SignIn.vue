<template>
  <div class="flex justify-evenly">
    <div class="q-pa-md" style="min-width: 30%;max-width: 70%">
      <h4 class="text-center">Se connecter</h4>
      <sign-inputs :signUpMode="false"></sign-inputs>
    </div>
    <div class="q-pa-md" style="min-width: 30%;max-width: 70%">
      <h4 class="text-center">S'inscrire</h4>
      <sign-inputs :signUpMode="true"></sign-inputs>
    </div>
  </div>
</template>

<script>
import SignInputs from 'components/SignInputs'

export default {
  components: {
    SignInputs
  },

  setup (props) {
    return { }
  }
}
</script>
