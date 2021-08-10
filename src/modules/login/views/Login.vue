<template>
	<div class="d-flex flex-column justify-center h-100 px-7" style="height: 300px">
			<div>
				<v-text-field
					ref="name"
					label="Email"
					v-model="name"
					required>
				</v-text-field>
			</div>
			<div>
				<v-text-field
					ref="password"
					label="Senha"
					type="password"
					v-model="password"
					required>
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
				<a href="#">Esqueci minha senha</a>
			</div>
			<div class="d-flex justify-end mt-7">
				<v-btn 
					class="text-subtitle-2 text-none mr-5" 
					color="secondary"
					depressed
					disabled>
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
			name: "",
			password: "",
		}
	},
	created: async function(){
		AuthService.logout()
	},
	methods: {
		async login () {
			this.isLoading = true
			this.loginFailed = false
			await AuthService.login(this.name, this.password)
				.then(() => {
					this.$router.push(AvailableRoutes.PieceManager)
				})
				.catch(error => {
					this.loginFailedMessage = error.response.data.message
					this.loginFailed = true
				})
			this.isLoading = false
		}
	}
};
</script>
