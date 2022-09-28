<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
  >
    <q-input
      filled
      type="email"
      v-model="email"
      label="Votre email *"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Champ obligatoire']"
    />

    <q-input
      filled
      type="password"
      v-model="password"
      label="Votre mot de passe *"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Champ obligatoire']"
    />
    <q-input
      v-if="signUpMode"
      filled
      type="password"
      v-model="passwordRepeat"
      label="Répétez le mot de passe *"
      lazy-rules
      :rules="[ passwordRepeatRule ]"
    />

    <div class="flex flex-center">
      <q-btn :label="validateButtonLabel" type="submit" color="primary"/>
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

export default {
  name: 'SignInputs',
  props: ['signUpMode'],
  setup (props) {
    const email = ref(null)
    const password = ref(null)
    const passwordRepeat = ref(null)

    const validateButtonLabel = props.signUpMode ? 'S\'inscrire' : 'Se connecter'

    const passwordRepeatRule = () => {
      return (passwordRepeat?.value && passwordRepeat?.value.length > 0 && passwordRepeat?.value === password?.value) || 'Répétez correctement le mot de passe'
    }

    // const $q = useQuasar()
    const userStore = useUserStore()
    // const user = computed(() => userStore.currentUser)

    const onSubmit = () => {
      props.signUpMode ? userStore.signUp(email.value, password.value) : userStore.signIn(email.value, password.value)
    }

    // watch(user, () => {
    //   if (userStore.error === false) {
    //     $q.notify({
    //       color: 'green-4',
    //       textColor: 'white',
    //       icon: 'cloud_done',
    //       message: 'Bienvenue !'
    //     })
    //   } else {
    //     $q.notify({
    //       color: 'red-4',
    //       textColor: 'white',
    //       icon: 'error',
    //       message: 'Identifiants incorrects'
    //     })
    //   }
    // })

    const onReset = () => {
      email.value = null
      password.value = null
      passwordRepeat.value = null
    }

    return {
      email,
      password,
      passwordRepeat,
      passwordRepeatRule,
      validateButtonLabel,
      onSubmit,
      onReset
    }
  }
}
</script>
