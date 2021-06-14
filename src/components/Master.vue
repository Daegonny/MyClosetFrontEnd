<template>
	<v-app id="inspire">
		<v-navigation-drawer 
			disable-resize-watcher 
			v-model="drawer" 
			app 
			clipped
			temporary
		>
			<v-list dense>
				<v-list-item v-for="path in paths" v-bind:key="path.link" link @click="nextPath = path.link">
					<v-list-item-action>
						<v-icon>{{path.icon}}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{path.title}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app clipped-left>
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
export default {
	components: {
		Alerts
	},
	data: () => ({
		drawer: false,
		currentPath: "/",
		nextPath: "/",
		paths: [
			{
				title: "Home",
				icon: "mdi-home-outline",
				link: "/"
			},
			{
				title: "Meu Guarda-roupa",
				icon: "mdi-wardrobe-outline",
				link: "/piece/manager"
			}
		]
	}),
	created () {
		this.$vuetify.theme.dark = true
	},
	watch:{
		nextPath: function(value){
			if(this.currentPath != value){
				this.currentPath = value;
				this.$router.push(value);
			}
		}
	}
}
</script>