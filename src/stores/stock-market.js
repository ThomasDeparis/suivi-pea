/* eslint-disable */
import { defineStore } from 'pinia';
import { useLechoBeApiStore } from './lecho-be-api'

const apiStore = useLechoBeApiStore()

export const useStockMarketStore = defineStore('stock-market', {
  state: () => ({
    market: {
      isLoaded: false,
      name: '',
      stocks: [],
      totalStocks: 0
    },
    brandIcons: {},
    stockDetail: {} // detail about one stock
  }),

  actions: {
    async fetchMarket(marketName, page) {
      this.market.isLoaded = false
      console.log(marketName)
      await fetch(apiStore.getMarketUrl(marketName, page))
        .then(response => response.json())
        .then(result => {
          this.market.stocks = []

          for (let s of result.embedded.issues) {
            const tempStock = {
              isinCode: s.isinCode,
              name: s?.fullName?.default,
              lastValue: s?.values?.lastPrice,
              variation: s?.values?.dayChangePercentage,
              currency: s?.currency,
              urn: s?.urn
            }

            this.market.stocks.push(tempStock)
          }

          this.market.totalStocks = result.embedded.total            
          this.market.name = marketName
      })
      .catch(err => { throw err })

      this.market.isLoaded = true
    },

    async fetchBrandIcons() {
      if (this.market.isLoaded) {

        for (let s of this.market.stocks) {
          if (!this.brandIcons[s.isinCode]) {

            await fetch(apiStore.getBrandIconUrl(s.name))
              .then(response => response.json())
              .then(result => {              
                if (result?.length > 0) {
                  this.brandIcons[s.isinCode] = { icon: result[0]?.icon }
                }
              })
          }
        }
      }
    },

    async fetchStockDetail (stockUrn) {
      await fetch(apiStore.getStockDetailUrl(stockUrn))
        .then(response => response.json())
        .then(result => {
          this.stockDetail = {
            name: result?.fullName?.default,
            isinCode: result?.isinCode,
            currency: result?.currency,
            dividend: result?.consensus?.dividend?.previousYearValue, // dividend received year y for y-1 results
            dividendPercent: result?.consensus?.dividendReturn?.previousYearValue,
            values: {
              lastValue: result?.values?.lastPrice,
              variation: result?.values?.dayChangePercentage,
              lastTime: result.values?.lastTime
            },
            marketCap: result?.consensus?.marketCap
          }
        })
        .catch(error => { throw error })
    },

    deleteStockDetail() {
      this.stockDetail = {}
      console.log('stockDetail deleted')
    }
  }
})

