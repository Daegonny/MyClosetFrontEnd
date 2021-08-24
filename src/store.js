import Vuex from 'vuex'
import Vue from 'vue'
import pieceStore from '@/modules/piece/store'
import commonsStore from '@/modules/commons/store'
import accountStore from '@/modules/account/store'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		pieceStore,
		commonsStore,
		accountStore
	}
})
