<template>
	<div class="d-flex flex-column justify-space-between h-100">
		<div class="d-flex justify-center pa-7">
			<h1>MyCloset</h1>
		</div>
		<div class="d-flex flex-column justify-center h-100 px-7">
			<div>
				<v-text-field
					ref="email"
					label="Email"
					v-model="email">
				</v-text-field>
			</div>
			<div>
				<v-text-field
					ref="password"
					label="Senha"
					type="password"
					v-model="password"
					v-on:keyup.enter="login">
				</v-text-field>
			</div>
			<div v-if="loginFailed">
				<v-alert
					dense
					outlined
					type="error">
						{{ loginFailedMessage }}
				</v-alert>
			</div>
			<div class="d-flex justify-end">
				<a href="#" @click="forgotPassword">Esqueci minha senha</a>
			</div>
			<div class="d-flex justify-end mt-7">
				<v-btn 
					class="text-subtitle-2 text-none mr-5" 
					color="secondary"
					depressed
					@click="$router.push(availableRoutes.Profile)">
					Criar conta <v-icon right dark> mdi-account-plus </v-icon>
				</v-btn>
				<v-btn 
					class="text-subtitle-2 text-none" 
					color="primary"	
					depressed
					:loading="isLoading"
					:disabled="isLoading"
					@click="login">
					Entrar <v-icon right dark> mdi-login </v-icon>
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script>

import { AuthService } from '@/auth'
import { AvailableRoutes } from '@/router/availableRoutes.js'

export default {
	data() {
		return { 
			isLoading: false,
			loginFailed: false,
			loginFailedMessage: "",
			email: "",
			password: "",
		}
	},
	created (){
		if(AuthService.isUserLogged())
			this.$router.push(AvailableRoutes.PieceManager)
	},
	computed: {
		availableRoutes () {
			return AvailableRoutes
		}
	},
	methods: {
		async login () {
			this.isLoading = true
			this.loginFailed = false
			await AuthService.login(this.email, this.password)
				.then(() => {
					this.$router.push(AvailableRoutes.PieceManager)
				})
				.catch(error => {
					this.loginFailedMessage = error.response.data.message
					this.loginFailed = true
					this.password = ""
				})
			this.isLoading = false
		},
		forgotPassword () {
			this.$store.commit("ADD_INFO_MESSAGE", "Funcionalidade ainda não implementada.")
		}
	}
};
</script>
