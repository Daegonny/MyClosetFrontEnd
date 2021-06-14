import Vuex from 'vuex'
import Vue from 'vue'
import pieceStore from '@/modules/piece/store'
import commonsStore from '@/modules/commons/store'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		pieceStore,
		commonsStore
	}
})
