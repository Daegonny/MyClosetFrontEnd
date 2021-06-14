import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/modules/info/views/Home'
import PieceManager from '@/modules/piece/views/PieceManager'
Vue.use(VueRouter)

const routes = [
{
	path: '',
	name: 'home',
	component: Home
},
{
	path: '/piece/manager',
	name: 'pieceManager',
	component: PieceManager
},
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router
