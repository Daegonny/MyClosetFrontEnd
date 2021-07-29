<template>
	<h1>Ensaluti {{name}}</h1>
</template>

<script>

import { AuthService } from '@/auth'

export default {
	data() {
		return { 
			name: ""
		}
	},
	created: async function(){
		AuthService.logout()
		await AuthService.login("igorchagasm@hotmail.com", "123456")
		this.name = AuthService.getAccount()?.Name
	}
};
</script>
