/* eslint-disable */
import { defineStore } from 'pinia';

const marketApi = {
  urlBegin: 'https://api.lecho.be/services/stockmarketgroup/urn:',
  urlEnd: '/issues.json?pageSize=50&page='
}

const brandIconsApi = 'https://api.brandfetch.io/v2/search/'

const markets = [
  {
    name: 'SP500',
    apiUrn: 'stockmarketgroup:snp.shares.sp500',
  },
  {
    name: 'Paris - grandes cap.',
    apiUrn : 'stockmarketgroup:euronext.france.shares.french.compa'
  },
  {
    name: 'Paris - moy. cap.',
    apiUrn: 'stockmarketgroup:euronext.france.shares.french.compb'
  },
  {
    name: 'Paris - petites cap.',
    apiUrn: 'stockmarketgroup:euronext.france.shares.french.compc'
  },
  {
    name: 'Paris - ETF',
    apiUrn: 'stockmarketgroup:euronext.paris.trackers.continuous.mlst'
  }
]

export const useLechoBeApiStore = defineStore('lecho-be-api', {
  state: () => ({
    markets: markets.map(m => m.name)
  }),

  actions: {
    getMarketUrl(marketName, page) {
      const market = markets.find(m => m.name === marketName)

      const apiPage = page - 1
      return marketApi.urlBegin + market.apiUrn + marketApi.urlEnd + apiPage
    },
    getBrandIconUrl(stockName) {
      return brandIconsApi + stockName.replace(/\s/g, '')
    }
  }
})

