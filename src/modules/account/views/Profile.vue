<template>
	<div class="d-flex flex-column justify-space-between h-100">
		<div class="d-flex justify-center pa-7">
			<h1>Perfil</h1>
		</div>
		<v-form model="valid" class="d-flex flex-column justify-center h-100 px-7">
			<div>
				<v-text-field
					ref="name"
					label="Nome"
					v-model="account.name"
				/>
			</div>
			<div>
				<v-text-field
					ref="email"
					label="Email"
					v-model="account.email"
				/>
			</div>
			<div>
				<v-text-field
					ref="emailConfirm"
					label="Confirme email"
					v-model="account.emailConfirm"
				/>
			</div>
			<div>
				<v-text-field
					ref="password"
					label="Senha"
					type="password"
					v-model="account.password"
				/>
			</div>
			<div>
				<v-text-field
					ref="passwordConfirm"
					label="Confirme a senha"
					type="password"
					v-model="account.passwordConfirm"
				/>
			</div>
			<div v-if="!isUpdate">
				<v-text-field
					ref="inviteKey"
					label="Chave de convite"
					v-model="account.inviteKey"
				/>
			</div>
			<div v-if="isUpdate" class="d-flex justify-end mt-7">
				<v-btn 
					class="text-subtitle-2 text-none" 
					color="success"
					depressed
					:disabled="!allValid"
					@click="update">
					Salvar <v-icon right dark> mdi-floppy </v-icon>
				</v-btn>
			</div>
			<div v-else class="d-flex justify-end mt-7">
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
				inviteKey: "",
			},
			valid: false
		}
	},
	created(){
		if(this.isUpdate){
			this.account.name = AuthService.getAccount().Name
			this.account.email = AuthService.getAccount().Email
			this.account.emailConfirm = AuthService.getAccount().Email
		}
	},
	methods: {
		update() {
			alert("salvou")
		},

		create() {
			alert("criou")
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
			return true
		}
	}
};
</script>