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
		</v-main>

		<v-footer
			dark
			padless
		>
			<v-card
			class="flex"
			flat
			tile
			>
			<v-card-text class="py-2 text-center">
				{{ new Date().getFullYear() }} — <strong>MyCloset</strong>
				<v-btn small fab @click="goToTop" class="ml-5 grey darken-4">
						<v-icon>mdi-arrow-up-thick</v-icon>
				</v-btn>
			</v-card-text>
			</v-card>
		</v-footer>
	</v-app>
</template>

<script>
export default {
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
			},
			{
				title: "Importar Peças",
				icon: "mdi-tshirt-crew-outline",
				link: "/piece/importer"
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
	},
	methods: {
		goToTop (){
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}
	}
}
</script>