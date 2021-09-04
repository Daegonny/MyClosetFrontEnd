<template>
	<div class="d-flex flex-column justify-space-between h-100">
		<div class="d-flex justify-center pa-7">
			<h1>Perfil</h1>
		</div>
		<v-form ref="profileForm" v-model="valid" class="d-flex flex-column justify-center h-100 px-7">
			<div>
				<v-text-field
					ref="name"
					label="Nome"
					v-model="account.name"
					:rules="nameRules"
					validate-on-blur
				/>
			</div>
			<div>
				<v-text-field
					ref="email"
					label="Email"
					v-model="account.email"
					:rules="emailRules"
					@blur="checkEmailAvailability"
					:error-messages="emailErrorMessages"
					validate-on-blur
				/>
			</div>
			<div>
				<v-text-field
					ref="emailConfirm"
					label="Confirme email"
					v-model="account.emailConfirm"
					:rules="confirmEmailRules"
					validate-on-blur
				/>
			</div>
			<div>
				<v-text-field
					ref="password"
					label="Senha"
					type="password"
					v-model="account.password"
					:rules="passwordRules"
					validate-on-blur
				/>
			</div>
			<div>
				<v-text-field
					ref="passwordConfirm"
					label="Confirme a senha"
					type="password"
					v-model="account.passwordConfirm"
					:rules="confirmPasswordRules"
					validate-on-blur
				/>
			</div>
			<div v-if="!isUpdate">
				<v-text-field
					ref="inviteKey"
					label="Chave de convite"
					v-model="account.secretCode"
					:rules="secretCodeRules"
					@blur="checkSecretCodeAvailability"
					:error-messages="secretCodeErrorMessages"
					validate-on-blur
				/>
			</div>
			<div v-if="error">
				<v-alert
					dense
					outlined
					type="error">
						{{ errorMessage }}
				</v-alert>
			</div>
			<div v-if="isUpdate" class="d-flex justify-end mt-3">
				<v-btn
					class="text-subtitle-2 text-none"
					color="success"
					depressed
					:disabled="!allValid"
					@click="update">
					Salvar <v-icon right dark> mdi-floppy </v-icon>
				</v-btn>
			</div>
			<div v-else class="d-flex justify-end mt-3">
				<v-btn
					class="text-subtitle-2 text-none mr-5"
					color="secondary"
					depressed
					@click="$router.push(availableRoutes.Login)">
					Retornar ao Login <v-icon right dark> mdi-login </v-icon>
				</v-btn>
				<v-btn
					class="text-subtitle-2 text-none"
					color="success"
					depressed
					:disabled="!allValid"
					@click="create">
					Criar conta <v-icon right dark> mdi-account-plus </v-icon>
				</v-btn>
			</div>
		</v-form>
	</div>
</template>

<script>

import { AuthService } from '@/auth'
import { AvailableRoutes } from '@/router/availableRoutes.js'

export default {
	data() {
		return {
			isLoading: false,
			account: {
				name: "",
				email: "",
				emailConfirm: "",
				password: "",
				passwordConfirm: "",
				secretCode: "",
			},
			valid: false,
			error: false,
			errorMessage: "",
			emailErrorMessages: [],
			secretCodeErrorMessages: [],
			staticRules: {
				required: v => !!v || 'Campo obrigatório',
			}
		}
	},
	created(){
		if(this.isUpdate){
			this.syncAccount()
		}
		else{
			if(this.$route.query.secret)
				this.account.secretCode = this.$route.query.secret
		}
	},
	methods: {
		syncAccount(){
			this.account.name = AuthService.getAccount().name
			this.account.email = AuthService.getAccount().email
			this.account.emailConfirm = AuthService.getAccount().email
		},
		async update() {
			this.error = false
			this.isLoading = true
			await this.$store.dispatch("updateAccount", this.account)
				.then(response => {
					this.$store.commit("ADD_OK_MESSAGE", response.data.message)
					AuthService.saveToken(response.data.data)
					this.syncAccount()
				})
				.catch(error => {
					this.error = true
					this.errorMessage = error.response.data.message
				})
			this.isLoading = false
		},

		async create() {
			this.error = false
			this.isLoading = true
			await this.$store.dispatch("createAccount", this.account)
				.then(response => {
					this.$store.commit("ADD_OK_MESSAGE", response.data)
					this.$router.push(AvailableRoutes.Login)
				})
				.catch(error => {
					this.error = true
					this.errorMessage = error.response.data.message
				})
			this.isLoading = false
		},

		async checkEmailAvailability(){
			if(this.isUpdate && AuthService.getAccount().email == this.account.email){
				this.emailErrorMessages = []
				return
			}

			this.isLoading = true
			await this.$store.dispatch("checkEmailAvailability", this.account.email)
				.then(() => {
					this.emailErrorMessages = []
				})
				.catch(err => {
					console.log("entrou no catch", err)
					if(err && err.response && err.response.data)
						this.emailErrorMessages = [err.response.data.message]
				})

			this.isLoading = false
		},

		async checkSecretCodeAvailability(){
			this.isLoading = true
			await this.$store.dispatch("checkSecretCodeAvailability", {code: this.account.secretCode, type: 0})
				.then(() => {
					this.secretCodeErrorMessages = []
				})
				.catch(err => {
					if(err && err.response && err.response.data)
						this.secretCodeErrorMessages = [err.response.data.message]
				})
			this.isLoading = false
		},
	},
	computed: {
		isUpdate () {
			return AuthService.isUserLogged()
		},
		availableRoutes () {
			return AvailableRoutes
		},
		allValid () {
			return this.valid && !this.isLoading
		},

		nameRules() {
			return [
				this.staticRules.required,
				() => this.account.name && this.account.name.length >= 2 || "Nome deve conter ao menos 2 caracteres"
			]
		},

		emailRules() {
			return [
				this.staticRules.required,
				() => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.account.email) || "Email deve ser válido",
			]
		},

		confirmEmailRules() {
			return [
				this.staticRules.required,
				() => this.account.email === this.account.emailConfirm || "Email de confirmação deve ser igual",
			]
		},

		passwordRules() {
			return [
				this.staticRules.required,
				() => this.account.password && this.account.password.length >= 6 || "Senha deve conter ao menos 6 caracteres",
			]
		},

		confirmPasswordRules() {
			return [
				this.staticRules.required,
				() => this.account.password === this.account.passwordConfirm || "Senha de confirmação deve ser igual",
			]
		},

		secretCodeRules() {
			return [
				this.staticRules.required,
			]
		},
	}
};
</script>
