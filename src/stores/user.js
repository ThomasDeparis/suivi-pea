import { defineStore } from 'pinia'
import { auth } from '../firebase.config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    error: false,
    loading: false
  }),

  actions: {
    async signIn (email, password) {
      this.error = false
      this.loading = true

      await signInWithEmailAndPassword(auth, email, password)
        .then(() => { this.error = false })
        .catch((error) => {
          // TODO : gérer les erreurs avec un event ou un composant $q.notify() pour analyser l'erreur et notifier les pages concernées
          this.error = true
          throw error
        })

      this.loading = false
    },

    async signUp (email, password) {
      this.loading = true

      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => { this.loading = false })
        .catch((error) => {
          // TODO : gérer les erreurs avec un event ou un composant $q.notify() pour analyser l'erreur et notifier les pages concernées
          this.error = true
          throw error
        })

      this.loading = false
    },

    // observer to refresh current user when signin, signup etc.
    fetchUser () {
      onAuthStateChanged(auth, async user => {
        this.currentUser = user
      })
    },

    async signOut () {
      await signOut(auth)
    }
  }
})
