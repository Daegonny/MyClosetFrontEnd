<template>
	<v-app id="inspire">
		
		<v-navigation-drawer v-if="showTopbar()"
			disable-resize-watcher 
			v-model="drawer" 
			app 
			clipped
			temporary
		>
			<v-list dense>
				<v-list-item v-for="path in paths" v-bind:key="path.link" link @click="navigate(path.link)">
					<v-list-item-action>
						<v-icon>{{path.icon}}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{path.title}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app clipped-left v-if="showTopbar()">
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>MyCloset</v-toolbar-title>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
			<Alerts style="position: absolute"/>
		</v-main>
	</v-app>
</template>

<script>
import Alerts from "@/modules/commons/components/Alerts"
import { AvailableRoutes } from '@/router/availableRoutes.js'
import { AuthService } from '@/auth'

export default {
	components: {
		Alerts
	},
	data: () => ({
		drawer: false,
		isUserLogged: false,
		paths: [
			{
				title: "Home",
				icon: "mdi-home-outline",
				link: AvailableRoutes.Home
			},
			{
				title: "Meu Guarda-roupa",
				icon: "mdi-wardrobe-outline",
				link: AvailableRoutes.PieceManager
			},
			{
				title: "Perfil",
				icon: "mdi-account",
				link: AvailableRoutes.Profile
			},
			{
				title: "Sair",
				icon: "mdi-logout",
				link: AvailableRoutes.Login
			}
		]
	}),
	created () {
		this.$vuetify.theme.dark = true
	},
	methods:{
		navigate(path){
			if(path == AvailableRoutes.Login)
				AuthService.logout()
			if(this.$route.path != path)
				this.$router.push(path);
			this.drawer = false
		},
		showTopbar() {
			return AuthService.isUserLogged()
		}
	},
}
</script>