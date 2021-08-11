import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/modules/login/views/Login'
import Home from '@/modules/info/views/Home'
import PieceManager from '@/modules/piece/views/PieceManager'
import { AvailableRoutes } from '@/router/availableRoutes.js'
Vue.use(VueRouter)

const routes = [
{
	path: AvailableRoutes.Login,
	name: 'login',
	component: Login
},
{
	path: AvailableRoutes.Home,
	name: 'home',
	component: Home
},
{
	path: AvailableRoutes.PieceManager,
	name: 'pieceManager',
	component: PieceManager
},
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router
