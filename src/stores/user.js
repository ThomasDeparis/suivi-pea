import { defineStore } from 'pinia'
import { auth, db } from '../firebase.config'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

let walletObserver = null

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    error: false,
    loading: false,
    wallets: []
  }),

  actions: {
    async signIn (email, password) {
      this.error = false
      this.loading = true

      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          this.error = false
          this.fetchWallets()
        })
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
        .then(() => {
          this.loading = false
          this.fetchWallets()
        })
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
      this.resetWallet()
      await signOut(auth)
    },

    async fetchWallets () {
      if (this.currentUser != null && walletObserver == null) {
        this.loading = true
        const walletCollection = collection(db, 'wallets')
        const queryOnUser = query(walletCollection, where('userId', '==', this.currentUser.uid))

        walletObserver = onSnapshot(queryOnUser, (snapshot) => {
          this.wallets = snapshot.docs.map(function (w) {
            return { id: w.id, ...w.data() }
          })
        },
        (error) => {
          // TODO : améliorer gestion d'erreur
          this.wallets = []
          throw error
        })

        this.loading = false
      }
    },

    resetWallet () {
      if (walletObserver) {
        walletObserver()
      }
      this.wallets = null
    }
  }
})
