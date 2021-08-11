export default {
	ADD_OK_MESSAGE(state, message){
		state.messages.push(createMessage(message, "success"))
	},
	ADD_INFO_MESSAGE(state, message){
		state.messages.push(createMessage(message, "info"))
	},
	ADD_WARNING_MESSAGE(state, message){
		state.messages.push(createMessage(message, "warning"))
	},
	ADD_ERROR_MESSAGE(state, message){
		state.messages.push(createMessage(message, "error"))
	},
	CLEAN_MESSAGES(state){
		state.messages = state.messages.filter((c) => c.show)
	},
	SET_SHOW_TOPBAR(state, showTopbar){
		state.showTopbar = showTopbar
	}
}

function createMessage(message, color) {
	return {
		text: message,
		color: color,
		timeout: 2000,
		show: true
	}
}