/* eslint-disable */
import { defineStore } from 'pinia';
import { useLechoBeApiStore } from './lecho-be-api'

const apiStore = useLechoBeApiStore()

export const useStockMarketStore = defineStore('stock-market', {
  state: () => ({
    isStockLoaded: false,
    currentMarketName: '',
    currentStock: [],
    brandIcons: {},
    totalStock: 0
  }),

  actions: {
    async fetchMarket(marketName, page) {
      this.isStockLoaded = false

      await fetch(apiStore.getMarketUrl(marketName, page))
        .then(response => response.json())
        .then(result => {
          this.currentStock = []

          for (let s of result.embedded.issues) {
            const tempStock = {
              isinCode: s.isinCode,
              name: s?.fullName?.default,
              lastValue: s?.values?.lastPrice,
              variation: s?.values?.dayChangePercentage,
              currency: s?.currency,
              urn: s?.urn
            }

            this.currentStock.push(tempStock)
          }

          this.totalStock = result.embedded.total            
          this.marketName = marketName
      })
      .catch(err => { throw err })

      this.isStockLoaded = true
    },

    async fetchBrandIcons() {
      if (this.isStockLoaded) {

        for (let s of this.currentStock) {
          if (!this.brandIcons[s.isinCode]) {

            await fetch(apiStore.getBrandIconUrl(s.name))
              .then(response => response.json())
              .then(result => {              
                if (result?.length > 0) {
                  console.log('new icon for ' + s.name)
                  this.brandIcons[s.isinCode] = { icon: result[0]?.icon }
                }
              })
          }
        }
      }
    }
  }
})

