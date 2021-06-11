<template>
	<div>
		<div v-for="(message, index) in getMessages" :key="index">
			<v-snackbar 
				class="elevation-0 z-index-20"
				:color="message.color" 
				v-model="message.show"
				:timeout="message.timeout" 
				top
				vertical
				>
				<div class="d-flex flex-row justify-space-between">
					<div v-html="message.text">
					</div>
				</div>
			</v-snackbar>
		</div>
	</div>
</template>

<script>
export default {
	watch:{
		getMessages: function(){
			if(this.getMessages.filter(c => !c.show).length > 0)
				this.$store.commit("CLEAN_MESSAGES")
		}
	},
	computed:{
		getMessages() {
			return this.$store.getters.getMessages
		}
	}
};
</script>